import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Inquiry, ApplicantType } from '../../../shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit, OnDestroy {
  @ViewChild(EditPersonComponent) editPerson: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $inquiry: BehaviorSubject<Inquiry>, modelType: ApplicantType },
  ) { }

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
