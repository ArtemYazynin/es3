import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { ApplicantType, CommonService, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry>, modelType: ApplicantType },
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  inquiry: Inquiry;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  save() {
    const update = (patch: object) => {
      Object.assign(this.inquiry, patch);
      this.data.$inquiry.subscribe(inquiry => {
        this.inquiryService.update(inquiry.id, inquiry)
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => this.data.$inquiry.next(this.inquiry));
      }).unsubscribe();
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
