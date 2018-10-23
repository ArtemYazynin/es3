import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
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
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  inquiry: Inquiry;
  configs: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        this.inquiryService.saveCurrentEducationPlace(this.currentEducationPlaceEditComponent, (patch) => {
          this.storageService.set(this.inquiry.type, patch);
          Object.assign(this.inquiry, patch);
          this.data.$inquiry.next(this.inquiry);
        });
        this.dialogRef.close();
      }
    );
  }
}
