import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { AttachmentType, CommonService, Inquiry, Privilege } from '../../../../../shared';
import { PrivilegeEditComponent } from '../../../../../shared/components/privilege-edit/privilege-edit.component';
import { WizardStorageService } from '../../../../wizard/shared';

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
    private commonService: CommonService, private storageService: WizardStorageService) { }

  ngOnInit() {
  }

  save() {
    const inquiry = this.prepare();
    this.data.$inquiry.next(inquiry);
    this.storageService.set(inquiry["_type"], { privilege: inquiry.privilege })
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return !!this.privilegeEditComponent && this.privilegeEditComponent.isValid();
  }

  private prepare(): Inquiry {
    const privilege: Privilege = (() => {
      let result;
      if (!this.privilegeEditComponent.privilegeForm.controls.withoutPrivilege.value) {
        result = new Privilege(this.privilegeEditComponent.privilegeForm.controls.privilege.value.id,
          this.privilegeEditComponent.privilegeForm.controls.privilege.value.name,
          this.privilegeEditComponent.privilegeForm.controls.privilegeOrder.value);
        result.privilegeProofDocument =
          this.commonService.getDocumentByType([this.privilegeEditComponent.confirmationProofDocumentComponent], AttachmentType.PrivilegeProofDocument);
      }
      return result;
    })();
    return Object.assign({}, this.data.$inquiry.getValue(), { privilege: privilege });
  }
}
