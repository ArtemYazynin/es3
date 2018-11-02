import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, ConfirmationDocument, Privilege } from '../../../shared';
import { PrivilegeEditComponent } from '../../../shared/components/privilege-edit/privilege-edit.component';

@Component({
  selector: 'app-edit-privilege-dialog',
  templateUrl: './edit-privilege-dialog.component.html',
  styleUrls: ['./edit-privilege-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPrivilegeDialogComponent implements OnInit {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  config: ConfigsOfRoutingButtons;
  privilege: Privilege;

  constructor(public dialogRef: MatDialogRef<EditPrivilegeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { $privilege: BehaviorSubject<Privilege> }) { }

  ngOnInit() {
    this.privilege = this.data.$privilege.getValue();
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
      () => {
        let form = this.privilegeEditComponent.privilegeForm;
        const value = form.controls.withoutPrivilege.value
          ? undefined
          : (() => {
            let newPrivilege = Privilege.construct(form);
            newPrivilege.privilegeProofDocument = ConfirmationDocument.construct(this.privilegeEditComponent.confirmationProofDocumentComponent.confirmationDocumentForm,
              this.privilege && this.privilege.privilegeProofDocument ? this.privilege.privilegeProofDocument.id : undefined);
            return newPrivilege;
          })()
        this.data.$privilege.next(value);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }

  isValid() {
    return this.privilegeEditComponent && this.privilegeEditComponent.isValid();
  }
}