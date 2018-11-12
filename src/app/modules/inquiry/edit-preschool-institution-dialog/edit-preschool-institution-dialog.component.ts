import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, InquiryRequest } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
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
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<InquiryRequest> },
    private actionsButtonsService: ActionsButtonsService) { }

  inquiry: InquiryRequest;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
  }

  ngAfterViewInit(): void {
    this.config.primaryAction =
      this.actionsButtonsService.primaryActionPreschoolInstitutionDialog(this.editInstitutionsComponent, this.inquiry, this.data, this.dialogRef);
  }
}