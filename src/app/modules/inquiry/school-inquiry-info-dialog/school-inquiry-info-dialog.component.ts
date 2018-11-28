import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, SchoolInquiryInfo, Theme } from '../../../shared';
import { EditSchoolInquiryInfoComponent } from '../../../shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';

@Component({
  selector: 'app-school-inquiry-info-dialog',
  templateUrl: './school-inquiry-info-dialog.component.html',
  styleUrls: ['./school-inquiry-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolInquiryInfoDialogComponent implements OnInit {
  @ViewChild(EditSchoolInquiryInfoComponent) editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent;

  constructor(public dialogRef: MatDialogRef<SchoolInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $schoolInquiryInfo: BehaviorSubject<SchoolInquiryInfo> }) { }

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let schoolInquiryInfo = this.editSchoolInquiryInfoComponent.getResult();
        this.data.$schoolInquiryInfo.next(schoolInquiryInfo);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }

  isValid() {
    return this.editSchoolInquiryInfoComponent && this.editSchoolInquiryInfoComponent.isValid()
  }
}
