import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Inquiry, ConfirmationDocument } from '../../../../../shared';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.css']
})
export class DialogEditComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public inquiry: Inquiry) { }

  ngOnInit() {
    let s = this;
  }
  getDocumentView(document) {
    return ConfirmationDocument.toString(document);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
