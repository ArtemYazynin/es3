import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditCurrentEducationPlaceComponent } from '../shared/components/edit-current-education-place/edit-current-education-place.component';

@Component({
  selector: 'app-current-education-place-dialog',
  templateUrl: './edit-current-education-place-dialog.component.html',
  styleUrls: ['./edit-current-education-place-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditCurrentEducationPlaceDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditCurrentEducationPlaceComponent) currentEducationPlaceEditComponent: EditCurrentEducationPlaceComponent;
  constructor(public dialogRef: MatDialogRef<EditCurrentEducationPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private actionsButtonsService: ActionsButtonsService) { }

  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
  }

  ngAfterViewInit(): void {
    this.config.primaryAction = this.actionsButtonsService.primaryActionCurrentEducationsDialog(this.currentEducationPlaceEditComponent, this.inquiry, this.data, this.dialogRef);
  }
}
