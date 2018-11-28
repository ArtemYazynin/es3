import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FilesInfo, FileAttachment, BehaviorMode, CommonService, InquiryService, Inquiry, Theme } from '../..';
import { Subject, BehaviorSubject } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { WizardStorageService } from '../../../modules/wizard/shared';
import { MatDialog } from '@angular/material';
import { FileAttachmentService } from '../../file-attachment.service';
import { takeUntil, skip, flatMap } from 'rxjs/operators';
import { EditFileAttachmentsDialogComponent } from '../../../modules/inquiry/edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { Guid } from '../../models/guid';

@Component({
  selector: 'app-files-card',
  templateUrl: './files-card.component.html',
  styleUrls: ['./files-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilesCardComponent implements OnInit, OnDestroy {
  @Input() mode: BehaviorMode;
  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode; 
  theme:Theme;
  themes = Theme;
  inquiry: Inquiry;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService, private dialog: MatDialog,
    private commonService: CommonService, private cdr: ChangeDetectorRef, private fileAttachmentService: FileAttachmentService,
    private inquiryService: InquiryService) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Green : this.themes.Blue;
    if (this.route.snapshot.data.resolved.inquiryId) {
      this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(inquiry => {
          this.inquiry = inquiry;
          this.cdr.markForCheck();
        });
    } else {
      this.inquiry = this.route.snapshot.data.resolved.inquiry;
    }
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = { $inquiry: new BehaviorSubject<Inquiry>(this.inquiry) };
    config.$inquiry
      .pipe(skip(1), flatMap(inquiry => {
        inquiry.files.forEach(file => {
          if (!file.id) file.id = Guid.newGuid();
        });
        Object.assign(this.inquiry, { files: inquiry.files, haveDigitalSignature: inquiry.haveDigitalSignature })
        return this.inquiryService.update(this.inquiry.id, this.inquiry);
      }), takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.cdr.markForCheck();
      });

    this.dialog.open(EditFileAttachmentsDialogComponent, this.commonService.getDialogConfig(config));
  }
}
