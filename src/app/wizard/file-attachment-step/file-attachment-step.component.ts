import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { StepBase, WizardStorageService, ApplicantType, AttachmentType, Entity, AttachmentTypePipe, inquiryType, CommonService, FileAttachment } from '../../shared/index';
import { RequestOptions, Headers, RequestOptionsArgs } from '@angular/http';
import { HttpInterceptor } from '../../shared/http-interceptor';
import { map, filter, takeUntil } from 'rxjs/operators';
import { from, fromEvent, Observable, Subject } from 'rxjs/';
import { ActivatedRoute, Router, Params } from '@angular/router';

@Component({
  selector: 'app-file-attachment-step',
  templateUrl: './file-attachment-step.component.html',
  styleUrls: ['./file-attachment-step.component.css']
})
export class FileAttachmentStepComponent implements OnInit, OnDestroy, AfterViewInit, StepBase {
  private ngUnsubscribe: Subject<any> = new Subject();
  isOldBrowser: boolean = (() => {
    const version = this.commonService.getIeVersion()
    if (!version) return false;
    return version < 9;
  })();
  fileNotChoosen = "Файл не выбран";
  haveDigitalSignature = false;
  bunchOfFileView: Array<Entity<number>>;
  bunchOfFile: Array<FileAttachment> = [];
  private inquiryType: string;
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
      //this.router.navigate(["../previewStep"], { relativeTo: this.activatedRoute });
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
    fromEvent(document.getElementsByName("file"), "change")
      .pipe(
        takeUntil(this.ngUnsubscribe),
        filter(event => {
          return event.target["files"] != undefined;
        }),
        map(event => {
          const files: File[] = event.target["files"];
          return { file: files[0], attachmentType: event.target["id"] };
        }))
      .subscribe(params => {
        const pushFile = (fileView: Entity<number>) => {
          const index = this.bunchOfFile.findIndex(x => x.attachmentType == fileView.id);
          if (index == -1) {
            this.bunchOfFile.push(new FileAttachment(fileView.id, params.file));
          } else {
            this.bunchOfFile.splice(index, 1);
            this.bunchOfFile.push(new FileAttachment(fileView.id, params.file));
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
          const fileView = this.bunchOfFileView.find(x => x.id == params.attachmentType);
          updateFileView(fileView, params.file.name);
          pushFile(fileView);//push new file
        } else {
          const index = this.bunchOfFile.findIndex(x => x.attachmentType == params.attachmentType);
          if (index == -1) return;

          const fileView = this.bunchOfFileView.find(x => x.id == params.attachmentType);
          updateFileView(fileView, this.fileNotChoosen);
          this.bunchOfFile.splice(index, 1)//remove file
        }
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  isValid() {
    return this.bunchOfFile.length >= this.bunchOfFileView.length;
  }
  chooseFile(fileView: Entity<number>) {
    document.getElementById(fileView.id + "").click();
  }
  private initFiles() {
    this.getRequiredAttachmentTypes()
      .pipe(
        takeUntil(this.ngUnsubscribe),
        map((types: Array<AttachmentType>) => {
          let result: Array<Entity<number>> = [];
          types.forEach(type => {
            result.push(new Entity<number>(type, this.fileNotChoosen));
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

