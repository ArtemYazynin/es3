import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { EditSchoolInquiryInfoComponent } from '../../../shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { WizardStorageService } from '../../wizard/shared';

@Component({
  selector: 'app-edit-school-inquiry-info-dialog',
  templateUrl: './edit-school-inquiry-info-dialog.component.html',
  styleUrls: ['./edit-school-inquiry-info-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditSchoolInquiryInfoDialogComponent implements OnInit {
  @ViewChild(EditSchoolInquiryInfoComponent) editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent;

  constructor(public dialogRef: MatDialogRef<EditSchoolInquiryInfoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  configs: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        let inquiry = this.data.$inquiry.getValue();
        this.inquiryService.saveSchoolInquiryInfo(this.editSchoolInquiryInfoComponent, (patch) => {
          this.storageService.set(inquiry.type, patch);
          Object.assign(inquiry, patch);
          this.data.$inquiry.next(inquiry);
        })
        this.dialogRef.close();
      }
    );
  }
}
