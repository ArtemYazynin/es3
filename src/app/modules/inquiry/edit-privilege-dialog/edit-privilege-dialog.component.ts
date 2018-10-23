import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { PrivilegeEditComponent } from '../../../shared/components/privilege-edit/privilege-edit.component';
import { WizardStorageService } from '../../wizard/shared';

@Component({
  selector: 'app-edit-privilege-dialog',
  templateUrl: './edit-privilege-dialog.component.html',
  styleUrls: ['./edit-privilege-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPrivilegeDialogComponent implements OnInit {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  constructor(public dialogRef: MatDialogRef<EditPrivilegeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry> },
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  inquiry: Inquiry;
  configs: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.inquiry = this.data.$inquiry.getValue();
    this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        this.inquiryService.savePrivilege(this.privilegeEditComponent, (patch) => {
          this.storageService.set(this.inquiry.type, patch);

          Object.assign(this.inquiry, patch);
          this.data.$inquiry.next(this.inquiry);
        });
        this.dialogRef.close();
      }
    );
  }
}
