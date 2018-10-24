import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { PrivilegeEditComponent } from '../../../shared/components/privilege-edit/privilege-edit.component';

@Component({
  selector: 'app-edit-privilege-dialog',
  templateUrl: './edit-privilege-dialog.component.html',
  styleUrls: ['./edit-privilege-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPrivilegeDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  constructor(public dialogRef: MatDialogRef<EditPrivilegeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private actionsButtonsService: ActionsButtonsService) { }

  inquiry: Inquiry;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close);
  }

  ngAfterViewInit(): void {
    this.config.primaryAction = this.actionsButtonsService.primaryActionPrivilegeDialog(this.privilegeEditComponent, this.inquiry, this.data, this.dialogRef);
  }
}