import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { from, fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ApplicantType, AttachmentType, CommonService, CompilationOfWizardSteps, Entity, FileAttachment, FileView, inquiryType, StepBase, WizardStorageService } from '../../shared';

@Component({
  selector: 'app-file-attachment-step',
  templateUrl: './file-attachment-step.component.html',
  styleUrls: ['./file-attachment-step.component.css']
})
export class FileAttachmentStepComponent implements OnInit, OnDestroy, AfterViewInit, StepBase {
  private ngUnsubscribe: Subject<any> = new Subject();
  private fileNotChoosen = "Файл не выбран";

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private commonService: CommonService) { }

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  private compilationSteps: CompilationOfWizardSteps;
  attachmentType = AttachmentType;
  maxFilesCount = 10;
  haveDigitalSignature = false;
  bunchOfFileView: Array<FileView>;
  isOldBrowser: boolean = (() => {
    const version = this.commonService.getIeVersion()
    if (!version) return false;
    return version < 9;
  })();
  goTo = {
    back: () => {
      switch (this.inquiryType) {
        case inquiryType.preschool:
          this.router.navigate(["../preschoolInstitutionStep"], { relativeTo: this.route });
          break;
        case inquiryType.school:
          this.router.navigate(["../schoolInstitutionStep"], { relativeTo: this.route });
          break;
        case inquiryType.healthCamp:
          this.router.navigate(["../healthCampStep"], { relativeTo: this.route });
          break;
        default:
          break;
      }
    },
    next: () => {
      const data = this.bunchOfFileView
      .filter(x => x.fileAttachment.file != null)
        .map(x => {
          const data = Object.assign({}, x.fileAttachment.file, { name: x.fileAttachment.file.name });
          return data;
        });
      this.storageService.set(this.inquiryType, { files: data });
      this.router.navigate(["../previewStep"], { relativeTo: this.route });
    }
  };


  ngOnInit() {
    this.compilationSteps = this.storageService.get(this.inquiryType);
    this.initFiles();
  }
  ngAfterViewInit(): void {
    fromEvent(document.getElementById("add"), "click")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.bunchOfFileView.length >= this.maxFilesCount)
          return;
        this.bunchOfFileView.push(new FileView(this.fileNotChoosen, this.bunchOfFileView.length, new FileAttachment(AttachmentType.Other, null)));
        setTimeout(() => {
          this.subscribeFileChange();
        }, 0);
      });
    this.subscribeFileChange();
  }
  private subscribeFileChange() {
    fromEvent(document.getElementsByName("file"), "change")
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(event => {
          return event.target["files"] != undefined;
        }),
        map(event => {
          const files: File[] = event.target["files"];
          return { file: files[0], attachmentType: event.target["id"], index: event.target["dataset"].index };
        }))
      .subscribe(params => {
        const updateFileView = (fileView: Entity<number>, value: string) => {
          fileView.name = value;
        }
        if (params.file) {
          if (!this.fileSizeIsValid(params.file)) {
            alert("Размер файла не должен превышать 5мб.");
            return;
          }
          const fileView = this.bunchOfFileView.find(x => x.index == params.index);
          updateFileView(fileView, params.file.name);
          fileView.fileAttachment.file = params.file;
        } else {
          const fileView = this.bunchOfFileView.find(x => x.fileAttachment.attachmentType == params.attachmentType && x.index == params.index);
          updateFileView(fileView, this.fileNotChoosen);
        }
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  remove(fileView: FileView) {
    this.bunchOfFileView.splice(fileView.index, 1);
  }
  isValid() {
    const isValid = this.bunchOfFileView
      .filter(x => x.fileAttachment.attachmentType != AttachmentType.Other)
      .every(x => !isNullOrUndefined(x.fileAttachment.file))
    return isValid;
  }
  chooseFile(fileView: FileView) {
    const elements = document.querySelectorAll("[data-index='" + fileView.index + "']")
    elements[0]["click"]();
  }
  private initFiles() {
    this.getRequiredAttachmentTypes()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((types: Array<AttachmentType>) => {
          let result: Array<FileView> = [];
          types.forEach((type, index) => {
            result.push(new FileView(this.fileNotChoosen, index, new FileAttachment(type, null)));
          });
          return result;
        }))
      .subscribe(result => {
        this.bunchOfFileView = result;
      });
  }

  private getRequiredAttachmentTypes(): Observable<AttachmentType[]> {
    return from([this.compilationSteps.applicantType])
      .pipe(map(applicantType => {
        let attachmentTypes: Array<AttachmentType> = [];
        if (!this.compilationSteps) return attachmentTypes;

        const hasParent = !!this.compilationSteps.parent;
        const pushParentDocuments = () => {
          if (hasParent && this.compilationSteps.parent.parentRepresentChildrenDocument)
            attachmentTypes.push(AttachmentType.ParentRepresentChildren);
          if (hasParent && this.compilationSteps.parent.countryStateDocument)
            attachmentTypes.push(AttachmentType.CountryStateDocument);
        }
        switch (applicantType) {
          case ApplicantType["Законный представитель ребенка"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate);
            pushParentDocuments();
            break;
          case ApplicantType["Доверенное лицо законного представителя ребенка"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate,
              AttachmentType.ApplicantIdentityCard, AttachmentType.ApplicantRepresentParent);
            pushParentDocuments();
            if (this.compilationSteps.applicant.countryStateApplicantDocument)
              attachmentTypes.push(AttachmentType.CountryStateApplicantDocument);

            break;
          case ApplicantType["Ребенок-заявитель"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard);
            break;
          default:
            break;
        }
        if (this.compilationSteps.children && this.compilationSteps.children.length > 0
          && this.compilationSteps.children[0].specHealthDocument) {
          attachmentTypes.push(AttachmentType.SpecHealthDocument);
        }
        if (this.compilationSteps.privilege) {
          attachmentTypes.push(AttachmentType.PrivilegeProofDocument);
        }
        return attachmentTypes;
      }));
  }

  private fileSizeIsValid(file: File) {
    const fiveMbyteInByte = 5242880;
    return file.size <= fiveMbyteInByte;
  }
}

