import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ApplicantType, CommonService, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry>, modelType: ApplicantType },
    private commonService: CommonService, private storageService: WizardStorageService,
    private inquiryService: InquiryService) { }

  inquiry: Inquiry;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
  }

  save() {
    const update = (patch: object) => {
      this.storageService.set(this.inquiry.type, patch);
      Object.assign(this.inquiry, patch);
      this.data.$inquiry.next(this.inquiry);
    }

    this.inquiryService.saveParent(this.inquiry, this.editPersonComponent, update, this.data.modelType == ApplicantType.Parent);
    if (this.data.modelType == ApplicantType.Applicant) {
      this.inquiryService.saveApplicant(this.inquiry, this.editPersonComponent, update);
    }
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return this.editPersonComponent && this.editPersonComponent.isValid();
  }
}
