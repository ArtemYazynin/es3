import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, ApplicantType, CommonService, DublicatesFinder, InquiryService } from '../../../shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';
import { ApplicantTypePipe } from '../../../shared/applicant-type.pipe';
import { WizardStorageService } from '../../wizard/shared';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit, OnDestroy {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry>, modelType: ApplicantType },
    private commonService: CommonService, private storageService: WizardStorageService,
    private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  save() {
    const update = (patch: object) => {
      this.storageService.set(inquiry.type, patch);
      Object.assign(inquiry, patch);
      this.data.$inquiry.next(inquiry);
    }
    let inquiry = this.data.$inquiry.getValue();
    this.inquiryService.saveParent(inquiry, this.editPersonComponent, update, this.data.modelType == ApplicantType.Parent);
    if (this.data.modelType == ApplicantType.Applicant) {
      this.inquiryService.saveApplicant(inquiry, this.editPersonComponent, update);
    }
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return this.editPersonComponent && this.editPersonComponent.isValid();
  }
}
