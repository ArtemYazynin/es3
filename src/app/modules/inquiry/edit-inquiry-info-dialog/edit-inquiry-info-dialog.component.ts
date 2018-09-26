import { Component, OnInit, Inject, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, ApplicantType, CommonService, InquiryService, DistributionParams, StayMode, AgeGroup, InquiryInfo } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditInquiryInfoComponent } from '../shared/components/edit-inquiry-info/edit-inquiry-info.component';

@Component({
  selector: 'app-edit-inquiry-info-dialog',
  templateUrl: './edit-inquiry-info-dialog.component.html',
  styleUrls: ['./edit-inquiry-info-dialog.component.css']
})
export class EditInquiryInfoDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditInquiryInfoComponent) editInquiryInfoComponent: EditInquiryInfoComponent;

  constructor(public dialogRef: MatDialogRef<EditInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private commonService: CommonService, private storageService: WizardStorageService,
    private inquiryService: InquiryService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  save() {
    this.inquiryService.saveInquiryInfo(this.editInquiryInfoComponent, (patch) => {
      this.storageService.set(this.data.$inquiry.getValue().type, patch);
      
      let inquiry = this.data.$inquiry.getValue();
      Object.assign(inquiry, patch);
      this.data.$inquiry.next(inquiry);
      
    })
    this.dialogRef.close();
  }

  isValid() {
    return this.editInquiryInfoComponent && this.editInquiryInfoComponent.isValid();
  }
}
