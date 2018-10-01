import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { CommonService, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditCurrentEducationPlaceComponent } from '../shared/components/edit-current-education-place/edit-current-education-place.component';

@Component({
  selector: 'app-current-education-place-dialog',
  templateUrl: './edit-current-education-place-dialog.component.html',
  styleUrls: ['./edit-current-education-place-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCurrentEducationPlaceDialogComponent implements OnInit {
  @ViewChild(EditCurrentEducationPlaceComponent) currentEducationPlaceEditComponent: EditCurrentEducationPlaceComponent;
  constructor(public dialogRef: MatDialogRef<EditCurrentEducationPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private commonService: CommonService, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  save() {
    this.inquiryService.saveCurrentEducationPlace(this.currentEducationPlaceEditComponent, (patch) => {
      this.storageService.set(this.data.$inquiry.getValue().type, patch);

      let inquiry = this.data.$inquiry.getValue();
      Object.assign(inquiry, patch);
      this.data.$inquiry.next(inquiry);
    });
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return !!this.currentEducationPlaceEditComponent && this.currentEducationPlaceEditComponent.isValid();
  }
}
