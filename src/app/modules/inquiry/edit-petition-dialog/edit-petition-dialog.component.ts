import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditPetitionComponent } from '../shared/components/edit-petition/edit-petition.component';

@Component({
  selector: 'app-edit-petition-dialog',
  templateUrl: './edit-petition-dialog.component.html',
  styleUrls: ['./edit-petition-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetitionDialogComponent implements OnInit {
  @ViewChild(EditPetitionComponent) editPetitionComponent: EditPetitionComponent;
  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditPetitionDialogComponent>, private storageService: WizardStorageService,
    private inquiryService: InquiryService, @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> }) { }

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        this.inquiryService.savePetition(this.editPetitionComponent, (patch) => {
          this.storageService.set(this.inquiry.type, patch);
          Object.assign(this.inquiry, patch);
          this.data.$inquiry.next(this.inquiry);
        })
        this.dialogRef.close();
      }
    );

  }
}
