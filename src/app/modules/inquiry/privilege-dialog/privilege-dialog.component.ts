import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, ConfirmationDocument, Privilege } from '../../../shared';
import { EditPrivilegeComponent } from '../../../shared/components/edit-privilege/edit-privilege.component';

@Component({
  selector: 'app-privilege-dialog',
  templateUrl: './privilege-dialog.component.html',
  styleUrls: ['./privilege-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeDialogComponent implements OnInit {
  @ViewChild(EditPrivilegeComponent) privilegeEditComponent: EditPrivilegeComponent;
  config: ConfigsOfRoutingButtons;
  privilege: Privilege;

  constructor(public dialogRef: MatDialogRef<PrivilegeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { $privilege: BehaviorSubject<Privilege> }) { }

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