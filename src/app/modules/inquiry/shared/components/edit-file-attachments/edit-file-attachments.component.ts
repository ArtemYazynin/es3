import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { from, fromEvent, Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { esConstant } from '../../../../../app.module';
import { ApplicantType, AttachmentType, CommonService, FileAttachment, FileView, Inquiry } from '../../../../../shared';

@Component({
  selector: 'app-edit-file-attachments',
  templateUrl: './edit-file-attachments.component.html',
  styleUrls: ['./edit-file-attachments.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFileAttachmentsComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() inquiry: Inquiry;

  private ngUnsubscribe: Subject<any> = new Subject();

  attachmentType = AttachmentType;
  maxFilesCount = 10;
  haveDigitalSignature = false;
  bunchOfFileView: Array<FileView> = [];
  isOldBrowser: boolean = (() => {
    const version = this.commonService.getIeVersion()
    if (!version) return false;
    return version < 9;
  })();
  constructor(private cdr: ChangeDetectorRef, private commonService: CommonService, @Inject(esConstant) private esConstant) { }

  ngOnInit() {
    this.initFiles();
    this.haveDigitalSignature = this.inquiry.filesInfo && this.inquiry.filesInfo.haveDigitalSignature;
  }
  ngAfterViewInit(): void {
    fromEvent(document.getElementById("add"), "click")
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (this.bunchOfFileView.length >= this.maxFilesCount)
          return;
        this.bunchOfFileView.push(new FileView(this.esConstant.fileNotChoosen, this.bunchOfFileView.length, new FileAttachment(AttachmentType.Other)));
        this.cdr.markForCheck();
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
          if (files.length > 0)
            return { file: files[0], attachmentType: event.target["id"], index: event.target["dataset"].index, name: files[0].name };
          else
            return { file: undefined, attachmentType: event.target["id"], index: event.target["dataset"].index, name: this.esConstant.fileNotChoosen };
        }))
      .subscribe(params => {

        if (params.file) {
          if (!this.fileSizeIsValid(params.file)) {
            alert("Размер файла не должен превышать 5мб.");
            return;
          }
          const fileView = this.bunchOfFileView.find(x => x.index == params.index);
          this.updateFileView(fileView, params.file);

        } else {
          const fileView = this.bunchOfFileView.find(x => x.fileAttachment.attachmentType == params.attachmentType && x.index == params.index);
          this.updateFileView(fileView, this.esConstant.fileNotChoosen);
        }
        this.cdr.markForCheck();
      });
  }

  updateFileView(fileView: FileView, value: string | File) {
    if (typeof (value) == "string") {
      fileView.name = value;
      fileView.fileAttachment.file = undefined;
      fileView.fileAttachment.description = undefined;
      fileView.fileAttachment.name = "";
    }
    else {
      fileView.name = value.name;
      fileView.fileAttachment.file = value;
    }
  }

  chooseFile(fileView: FileView) {
    this.updateFileView(fileView, this.esConstant.fileNotChoosen);
    this.cdr.markForCheck();
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
          let fileViewCollection: Array<FileView> = this.commonService.getFiles(types, this.inquiry.filesInfo);
          return fileViewCollection;
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
