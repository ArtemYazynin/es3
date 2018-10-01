import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditInstitutionsComponent } from '../shared/components/edit-institutions/edit-institutions.component';

@Component({
  selector: 'app-edit-preschool-institution-dialog',
  templateUrl: './edit-preschool-institution-dialog.component.html',
  styleUrls: ['./edit-preschool-institution-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPreschoolInstitutionDialogComponent implements OnInit {
  @ViewChild(EditInstitutionsComponent) editInstitutionsComponent: EditInstitutionsComponent;
  constructor(public dialogRef: MatDialogRef<EditPreschoolInstitutionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  save() {
    this.inquiryService.saveWishInstitutions(this.editInstitutionsComponent, (patch) => {
      this.storageService.set(this.data.$inquiry.getValue().type, patch);

      let inquiry = this.data.$inquiry.getValue();
      Object.assign(inquiry, patch);
      this.data.$inquiry.next(inquiry);
    })
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return !!this.editInstitutionsComponent && this.editInstitutionsComponent.isValid();
  }
}
