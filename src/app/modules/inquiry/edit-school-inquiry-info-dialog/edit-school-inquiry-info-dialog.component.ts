import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, InquiryRequest } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditSchoolInquiryInfoComponent } from '../../../shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';

@Component({
  selector: 'app-edit-school-inquiry-info-dialog',
  templateUrl: './edit-school-inquiry-info-dialog.component.html',
  styleUrls: ['./edit-school-inquiry-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSchoolInquiryInfoDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditSchoolInquiryInfoComponent) editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent;

  constructor(public dialogRef: MatDialogRef<EditSchoolInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<InquiryRequest> },
    private actionsButtonsService: ActionsButtonsService) { }

  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
  }

  ngAfterViewInit(): void {
    this.config.primaryAction =
      this.actionsButtonsService.primaryActionSchoolInquiryInfoDialog(this.editSchoolInquiryInfoComponent, this.data.$inquiry.getValue(), this.data, this.dialogRef);
  }
}
