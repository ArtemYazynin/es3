import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { CommonService, Inquiry, InquiryService } from '../../../shared';
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
    private commonService: CommonService, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
  }

  save() {
    this.inquiryService.savePrivilege(this.privilegeEditComponent, (patch) => {
      this.storageService.set(this.data.$inquiry.getValue().type, patch);

      let inquiry = this.data.$inquiry.getValue();
      Object.assign(inquiry, patch);
      this.data.$inquiry.next(inquiry);
    });
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return !!this.privilegeEditComponent && this.privilegeEditComponent.isValid();
  }
}
