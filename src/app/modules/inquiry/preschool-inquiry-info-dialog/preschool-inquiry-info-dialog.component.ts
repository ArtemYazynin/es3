import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, InquiryInfo } from '../../../shared';
import { EditPreschoolInquiryInfoComponent } from '../shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component';

@Component({
  selector: 'app-preschool-inquiry-info-dialog',
  templateUrl: './preschool-inquiry-info-dialog.component.html',
  styleUrls: ['./preschool-inquiry-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreschoolInquiryInfoDialogComponent implements OnInit {
  @ViewChild(EditPreschoolInquiryInfoComponent) editInquiryInfoComponent: EditPreschoolInquiryInfoComponent;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<PreschoolInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiryInfo: BehaviorSubject<InquiryInfo> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        let inquiryInfo = this.editInquiryInfoComponent.getResult();
        this.data.$inquiryInfo.next(inquiryInfo);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }
}
