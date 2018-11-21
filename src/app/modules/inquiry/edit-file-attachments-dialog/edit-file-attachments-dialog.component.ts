import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, FilesInfo, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
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
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<FilesInfo> },
    private actionsButtonsService: ActionsButtonsService) { }

  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        let filesInfo = this.fileAttachmentsEditComponent.getResult();
        let inquiry = new Inquiry();
        inquiry.files = filesInfo.files;
        inquiry.haveDigitalSignature = filesInfo.haveDigitalSignature;
        this.data.$inquiry.next(inquiry);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }
}
