import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditFileAttachmentsComponent } from '../shared/components/edit-file-attachments/edit-file-attachments.component';

@Component({
  selector: 'app-file-attachments-dialog',
  templateUrl: './edit-file-attachments-dialog.component.html',
  styleUrls: ['./edit-file-attachments-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFileAttachmentsDialogComponent implements OnInit {
  @ViewChild(EditFileAttachmentsComponent) fileAttachmentsEditComponent: EditFileAttachmentsComponent;
  constructor(public dialogRef: MatDialogRef<EditFileAttachmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        this.inquiryService.saveFileAttachments(this.fileAttachmentsEditComponent, (patch) => {
          this.storageService.set(this.inquiry.type, patch);
          Object.assign(this.inquiry, patch);
          this.data.$inquiry.next(this.inquiry);
        });
        this.dialogRef.close();
      }
    );
  }
}
