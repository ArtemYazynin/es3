import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { StepBase, WizardStorageService, ApplicantType, AttachmentType, Entity, inquiryType, CommonService, FileAttachment, FileView, CompilationOfWizardSteps } from '../../shared/index';
import { RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { map, filter, takeUntil } from 'rxjs/operators';
import { from, fromEvent, Observable, Subject, pipe, Subscription } from 'rxjs/';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-file-attachment-step',
  templateUrl: './file-attachment-step.component.html',
  styleUrls: ['./file-attachment-step.component.css']
})
export class FileAttachmentStepComponent implements OnInit, OnDestroy, AfterViewInit, StepBase {
  private ngUnsubscribe: Subject<any> = new Subject();
  private subscription: Subscription;
  private fileNotChoosen = "Файл не выбран";

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storageService: WizardStorageService, private commonService: CommonService) { }

  inquiryType: string;
  compilationSteps: CompilationOfWizardSteps;
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
          this.router.navigate(["../preschoolInstitutionStep"], { relativeTo: this.activatedRoute });
          break;
        case inquiryType.school:
          this.router.navigate(["../schoolInstitutionStep"], { relativeTo: this.activatedRoute });
          break;
        case inquiryType.healthCamp:
          this.router.navigate(["../healthCampStep"], { relativeTo: this.activatedRoute });
          break;

        default:
          break;
      }
    },
    next: () => {
      const data = this.bunchOfFileView.map(x => x.fileAttachment).filter(x => x.file != null);
      this.storageService.set(this.inquiryType, { files: data });
      this.router.navigate(["../previewStep"], { relativeTo: this.activatedRoute });
    }
  };


  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
    this.compilationSteps = this.storageService.get(this.inquiryType);
    this.initFiles();
  }
  ngAfterViewInit(): void {
    fromEvent(document.getElementById("add"), "click")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.bunchOfFileView.length >= this.maxFilesCount)
          return;
        this.subscription.unsubscribe();
        this.bunchOfFileView.push(new FileView(this.fileNotChoosen, this.bunchOfFileView.length, new FileAttachment(AttachmentType.Other, null)));
        setTimeout(() => {
          this.subscribeFileChange();
        }, 0);
      });
    this.subscribeFileChange();
  }
  private subscribeFileChange() {
    this.subscription = fromEvent(document.getElementsByName("file"), "change")
      .pipe(
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
    this.subscription.unsubscribe();
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
        if (this.compilationSteps.privilege) {
          attachmentTypes.push(AttachmentType.PrivilegeProofDocument);
        }
        if (this.compilationSteps.children.length > 0 && this.compilationSteps.children[0].specHealthDocument) {
          attachmentTypes.push(AttachmentType.SpecHealthDocument);
        }
        switch (applicantType) {
          case ApplicantType["Законный представитель ребенка"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate);
            if (this.compilationSteps.parent.parentRepresentChildrenDocument)
              attachmentTypes.push(AttachmentType.ParentRepresentChildren);
            if (this.compilationSteps.parent.countryStateDocument)
              attachmentTypes.push(AttachmentType.CountryStateDocument);
            break;
          case ApplicantType["Доверенное лицо законного представителя ребенка"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate,
              AttachmentType.ApplicantIdentityCard, AttachmentType.ApplicantRepresentParent);

            if (this.compilationSteps.parent.parentRepresentChildrenDocument)
              attachmentTypes.push(AttachmentType.ParentRepresentChildren);

            if (this.compilationSteps.parent.countryStateDocument)
              attachmentTypes.push(AttachmentType.CountryStateDocument);

            if (this.compilationSteps.applicant.countryStateApplicantDocument)
              attachmentTypes.push(AttachmentType.CountryStateApplicantDocument);

            break;
          case ApplicantType["Ребенок-заявитель"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard);
            break;
          default:
            break;
        }
        return attachmentTypes;
      }));
  }

  private fileSizeIsValid(file: File) {
    const fiveMbyteInByte = 5242880;
    return file.size <= fiveMbyteInByte;
  }
}

