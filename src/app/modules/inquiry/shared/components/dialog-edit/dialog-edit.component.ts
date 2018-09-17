import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inquiry } from '../../../../../shared';
import { PrivilegeEditComponent } from '../../../../../shared/components/privilege-edit/privilege-edit.component';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DialogEditComponent implements OnInit {
  @ViewChild(PrivilegeEditComponent) privilegeEditComponent: PrivilegeEditComponent;
  constructor(public dialogRef: MatDialogRef<DialogEditComponent>, @Inject(MAT_DIALOG_DATA) public inquiry: Inquiry) { }

  ngOnInit() {
    let s = this;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
