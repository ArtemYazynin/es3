import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inquiry, Privilege, CommonService, AttachmentType } from '../../../../../shared';
import { PrivilegeEditComponent } from '../../../../../shared/components/privilege-edit/privilege-edit.component';
import { WizardStorageService } from '../../../../wizard/shared';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditComponent implements OnInit {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  constructor(public dialogRef: MatDialogRef<DialogEditComponent>, @Inject(MAT_DIALOG_DATA) public $inquiry: BehaviorSubject<Inquiry>,
    private commonService: CommonService, private storageService: WizardStorageService) { }

  ngOnInit() {
  }

  save() {
    const inquiry = this.prepare();
    this.$inquiry.next(inquiry);
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
    return Object.assign({}, this.$inquiry.getValue(), { privilege: privilege });
  }
}
