import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, ConfirmationDocument, Privilege, Theme } from '../../../shared';
import { EditPrivilegeComponent } from '../../../shared/components/edit-privilege/edit-privilege.component';

@Component({
  selector: 'app-privilege-dialog',
  templateUrl: './privilege-dialog.component.html',
  styleUrls: ['./privilege-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeDialogComponent implements OnInit {
  @ViewChild(EditPrivilegeComponent) privilegeEditComponent: EditPrivilegeComponent;

  themes = Theme;
  config: ConfigsOfRoutingButtons;
  privilege: Privilege;

  constructor(public dialogRef: MatDialogRef<PrivilegeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { $privilege: BehaviorSubject<Privilege> }) { }

  ngOnInit() {
    this.privilege = this.data.$privilege.getValue();
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let form = this.privilegeEditComponent.privilegeForm;
        const value = form.controls.withoutPrivilege.value
          ? undefined
          : (() => {
            let newPrivilege = Privilege.construct(form);
            newPrivilege.privilegeProofDocument = ConfirmationDocument.construct(this.privilegeEditComponent.confirmationProofDocumentComponent.form,
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
    let validPrivilege = this.privilegeEditComponent && this.privilegeEditComponent.isValid() && this.privilegeEditComponent.privilegeForm.dirty;
    if (this.privilegeEditComponent.confirmationProofDocumentComponent)
      return validPrivilege || this.privilegeEditComponent.confirmationProofDocumentComponent.isValid();
    return validPrivilege;
  }
}