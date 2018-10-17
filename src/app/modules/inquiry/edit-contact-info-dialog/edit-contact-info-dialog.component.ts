import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { CommonService, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditContactInfoComponent } from '../shared/components/edit-contact-info/edit-contact-info.component';

@Component({
  selector: 'app-edit-contact-info-dialog',
  templateUrl: './edit-contact-info-dialog.component.html',
  styleUrls: ['./edit-contact-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditContactInfoDialogComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  @ViewChild(EditContactInfoComponent) editContactInfoComponent: EditContactInfoComponent;
  inquiry: Inquiry;
  constructor(public dialogRef: MatDialogRef<EditContactInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private commonService: CommonService, private storageService: WizardStorageService,
    private inquiryService: InquiryService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
  }

  save() {
    this.inquiryService.saveContactInfo(this.editContactInfoComponent, (patch) => {
      this.storageService.set(this.inquiry.type, patch);
      Object.assign(this.inquiry, patch);
      this.data.$inquiry.next(this.inquiry);
    })
    this.dialogRef.close();
  }
  isValid() {
    return this.editContactInfoComponent && this.editContactInfoComponent.isValid();
  }
}
