import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditInquiryInfoComponent } from '../shared/components/edit-inquiry-info/edit-inquiry-info.component';

@Component({
  selector: 'app-edit-inquiry-info-dialog',
  templateUrl: './edit-inquiry-info-dialog.component.html',
  styleUrls: ['./edit-inquiry-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInquiryInfoDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditInquiryInfoComponent) editInquiryInfoComponent: EditInquiryInfoComponent;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private cdr: ChangeDetectorRef, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
    this.config.primaryAction = this.actionsButtonsService.primaryActionInquiryInfoDialog(this.editInquiryInfoComponent, this.data.$inquiry.getValue(), this.data, this.dialogRef);
  }
}
