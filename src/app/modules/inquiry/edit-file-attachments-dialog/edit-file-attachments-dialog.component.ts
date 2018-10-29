import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditFileAttachmentsComponent } from '../shared/components/edit-file-attachments/edit-file-attachments.component';

@Component({
  selector: 'app-file-attachments-dialog',
  templateUrl: './edit-file-attachments-dialog.component.html',
  styleUrls: ['./edit-file-attachments-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFileAttachmentsDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditFileAttachmentsComponent) fileAttachmentsEditComponent: EditFileAttachmentsComponent;
  constructor(public dialogRef: MatDialogRef<EditFileAttachmentsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private actionsButtonsService: ActionsButtonsService) { }

  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
  }

  ngAfterViewInit(): void {
    this.config.primaryAction = this.actionsButtonsService.primaryActionFileAttachmentsDialog(this.fileAttachmentsEditComponent, this.inquiry, this.data, this.dialogRef);
  }
}
