import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { StepBase, WizardStorageService, ApplicantType, AttachmentType, Entity, AttachmentTypePipe, inquiryType, CommonService, FileAttachment, FileView } from '../../shared/index';
import { RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { map, filter, takeUntil } from 'rxjs/operators';
import { from, fromEvent, Observable, Subject, pipe, Subscription } from 'rxjs/';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { $ } from 'protractor';

@Component({
  selector: 'app-file-attachment-step',
  templateUrl: './file-attachment-step.component.html',
  styleUrls: ['./file-attachment-step.component.css']
})
export class FileAttachmentStepComponent implements OnInit, OnDestroy, AfterViewInit, StepBase {
  private ngUnsubscribe: Subject<any> = new Subject();
  private subscription: Subscription;
  private inquiryType: string;
  private fileNotChoosen = "Файл не выбран";

  attachmentType = AttachmentType;
  maxFilesCount = 10;
  haveDigitalSignature = false;
  bunchOfFileView: Array<FileView>;
  bunchOfFile: Array<FileAttachment> = [];
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
      this.storageService.files = this.bunchOfFile;
      this.router.navigate(["../previewStep"], { relativeTo: this.activatedRoute });
    }
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute,
    private http: HttpInterceptor, private storageService: WizardStorageService, private commonService: CommonService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
    this.initFiles();

  }
  ngAfterViewInit(): void {
    fromEvent(document.getElementById("add"), "click")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(e => {
        if (this.bunchOfFileView.length >= this.maxFilesCount) return;
        this.subscription.unsubscribe();
        this.bunchOfFileView.push(new FileView(AttachmentType.Other, this.fileNotChoosen, this.bunchOfFileView.length));
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
        const pushFile = (fileView: FileView) => {
          const index = this.bunchOfFile.findIndex(x => x.index == params.index);
          if (index == -1) {
            this.bunchOfFile.push(new FileAttachment(fileView.id, params.file, params.index));
          } else {
            this.bunchOfFile.splice(index, 1);
            this.bunchOfFile.push(new FileAttachment(fileView.id, params.file, params.index));
          }
        }
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
          pushFile(fileView);//push new file
        } else {
          const index = this.bunchOfFile.findIndex(x => x.index == params.index);
          if (index == -1) return;

          const fileView = this.bunchOfFileView.find(x => x.index == params.index);
          updateFileView(fileView, this.fileNotChoosen);
          this.bunchOfFile.splice(index, 1)//remove file
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

    const fileIndex = this.bunchOfFile.findIndex(file => file.index == fileView.index);
    if (fileIndex == -1) return;
    this.bunchOfFile.splice(fileIndex, 1);
  }
  isValid() {
    return this.bunchOfFile.filter(x => x.attachmentType != AttachmentType.Other).length >= this.bunchOfFileView.filter(x => x.id != AttachmentType.Other).length;
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
            result.push(new FileView(type, this.fileNotChoosen, index));
          });
          return result;
        }))
      .subscribe(result => {
        this.bunchOfFileView = result;
      });
  }

  private getRequiredAttachmentTypes(): Observable<AttachmentType[]> {
    return from([this.storageService.request.applicantType])
      .pipe(map(applicantType => {
        let attachmentTypes: Array<AttachmentType> = [];
        switch (applicantType) {
          case ApplicantType["Законный представитель ребенка"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate);
            if (this.storageService.request.parent.parentRepresentChildrenDocument)
              attachmentTypes.push(AttachmentType.ParentRepresentChildren);
            if (this.storageService.request.parent.countryStateDocument)
              attachmentTypes.push(AttachmentType.CountryStateDocument);
            break;
          case ApplicantType["Доверенное лицо законного представителя ребенка"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate,
              AttachmentType.ApplicantIdentityCard, AttachmentType.ApplicantRepresentParent);

            if (this.storageService.request.parent.parentRepresentChildrenDocument)
              attachmentTypes.push(AttachmentType.ParentRepresentChildren);

            if (this.storageService.request.parent.countryStateDocument)
              attachmentTypes.push(AttachmentType.CountryStateDocument);

            //CountryStateApplicantDocument from applicantStep

            break;
          case ApplicantType["Ребенок-заявитель"]:
            attachmentTypes.push(AttachmentType.ParentIdentityCard);
            break;
          default:
            //TEST DATA!!!!
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate,
              AttachmentType.ApplicantIdentityCard, AttachmentType.ApplicantRepresentParent, AttachmentType.ParentRepresentChildren,
              AttachmentType.CountryStateDocument, AttachmentType.CountryStateApplicantDocument);
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

