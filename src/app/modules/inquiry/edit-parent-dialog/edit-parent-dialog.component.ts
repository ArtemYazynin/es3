import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, ApplicantType } from '../../../shared';
import { EditParentComponent } from '../shared/components/edit-parent/edit-parent.component';

@Component({
  selector: 'app-edit-parent-dialog',
  templateUrl: './edit-parent-dialog.component.html',
  styleUrls: ['./edit-parent-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditParentDialogComponent implements OnInit, OnDestroy {
  @ViewChild(EditParentComponent) editParent:EditParentComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditParentDialogComponent>, @Inject(MAT_DIALOG_DATA) public $inquiry: BehaviorSubject<Inquiry>) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
  }

  save() {
    // const inquiry = this.prepare();
    // this.$inquiry.next(inquiry);
    // this.storageService.set(inquiry["_type"], { privilege: inquiry.privilege })
    // this.dialogRef.close();
  }

  isValid = (): boolean => {
    return true;
    //return !!this.privilegeEditComponent && this.privilegeEditComponent.isValid();
  }
}
