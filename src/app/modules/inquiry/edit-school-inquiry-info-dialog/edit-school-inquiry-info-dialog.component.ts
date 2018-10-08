import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, CommonService, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditSchoolInquiryInfoComponent } from '../../../shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';

@Component({
  selector: 'app-edit-school-inquiry-info-dialog',
  templateUrl: './edit-school-inquiry-info-dialog.component.html',
  styleUrls: ['./edit-school-inquiry-info-dialog.component.css']
})
export class EditSchoolInquiryInfoDialogComponent implements OnInit {
  @ViewChild(EditSchoolInquiryInfoComponent) editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent;
  constructor(public dialogRef: MatDialogRef<EditSchoolInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private commonService: CommonService, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  save() {
    let inquiry = this.data.$inquiry.getValue();
    this.inquiryService.saveSchoolInquiryInfo(this.editSchoolInquiryInfoComponent, (patch) => {
      this.storageService.set(inquiry.type, patch);
      Object.assign(inquiry, patch);
      this.data.$inquiry.next(inquiry);
    })
    this.dialogRef.close();
  }
  isValid() {
    return !!this.editSchoolInquiryInfoComponent && this.editSchoolInquiryInfoComponent.isValid();
  }
}
