import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, InquiryInfo, Theme } from '../../../shared';
import { EditPreschoolInquiryInfoComponent } from '../shared/components/edit-preschool-inquiry-info/edit-preschool-inquiry-info.component';

@Component({
  selector: 'app-preschool-inquiry-info-dialog',
  templateUrl: './preschool-inquiry-info-dialog.component.html',
  styleUrls: ['./preschool-inquiry-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreschoolInquiryInfoDialogComponent implements OnInit {
  @ViewChild(EditPreschoolInquiryInfoComponent) editInquiryInfoComponent: EditPreschoolInquiryInfoComponent;

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<PreschoolInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiryInfo: BehaviorSubject<InquiryInfo> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let inquiryInfo = this.editInquiryInfoComponent.getResult();
        this.data.$inquiryInfo.next(inquiryInfo);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }

  isValid() {
    return this.editInquiryInfoComponent && this.editInquiryInfoComponent.isValid()
  }
}
