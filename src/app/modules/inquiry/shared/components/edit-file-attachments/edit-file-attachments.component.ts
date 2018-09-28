import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy, DoCheck } from '@angular/core';
import { from, fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined, log } from 'util';
import { ApplicantType, AttachmentType, CommonService, Entity, FileAttachment, FileView, Inquiry } from '../../../../../shared';

@Component({
  selector: 'app-edit-file-attachments',
  templateUrl: './edit-file-attachments.component.html',
  styleUrls: ['./edit-file-attachments.component.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class EditFileAttachmentsComponent implements OnInit, AfterViewInit,DoCheck, OnDestroy {
  counter:number = 0;
  ngDoCheck(): void {
    this.counter++;
    console.log("counter: " + this.counter)
  }
  @Input() inquiry: Inquiry;

  private ngUnsubscribe: Subject<any> = new Subject();
  private fileNotChoosen = "Файл не выбран";

  attachmentType = AttachmentType;
  maxFilesCount = 10;
  haveDigitalSignature = false;
  bunchOfFileView: Array<FileView>;
  isOldBrowser: boolean = (() => {
    const version = this.commonService.getIeVersion()
    if (!version) return false;
    return version < 9;
  })();
  constructor(private cdr: ChangeDetectorRef, private commonService: CommonService) { }

  ngOnInit() {
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
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
        const updateFileView = (fileView: FileView, value: string) => {
          fileView.name = value;
          fileView.fileAttachment.file = null;
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
        this.cdr.detectChanges();
      });
  }

  chooseFile(fileView: FileView) {
    const elements = document.querySelectorAll("[data-index='" + fileView.index + "']")
    elements[0]["click"]();
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
    return from([this.inquiry.applicantType])
      .pipe(map(applicantType => {
        let attachmentTypes: Array<AttachmentType> = [];
        if (!this.inquiry) return attachmentTypes;

        const hasParent = !!this.inquiry.parent;
        const pushParentDocuments = () => {
          if (hasParent && this.inquiry.parent.parentRepresentChildrenDocument)
            attachmentTypes.push(AttachmentType.ParentRepresentChildren);
          if (hasParent && this.inquiry.parent.countryStateDocument)
            attachmentTypes.push(AttachmentType.CountryStateDocument);
        }
        switch (applicantType) {
          case ApplicantType.Parent:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate);
            pushParentDocuments();
            break;
          case ApplicantType.Applicant:
            attachmentTypes.push(AttachmentType.ParentIdentityCard, AttachmentType.ChildBirthdateCertificate,
              AttachmentType.ApplicantIdentityCard, AttachmentType.ApplicantRepresentParent);
            pushParentDocuments();
            if (this.inquiry.applicant.countryStateApplicantDocument)
              attachmentTypes.push(AttachmentType.CountryStateApplicantDocument);

            break;
          case ApplicantType.Child:
            attachmentTypes.push(AttachmentType.ParentIdentityCard);
            break;
          default:
            break;
        }
        if (this.inquiry.children && this.inquiry.children.length > 0
          && this.inquiry.children[0].specHealthDocument) {
          attachmentTypes.push(AttachmentType.SpecHealthDocument);
        }
        if (this.inquiry.privilege) {
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
