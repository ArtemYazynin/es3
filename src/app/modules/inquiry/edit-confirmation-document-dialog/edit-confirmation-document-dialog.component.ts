import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationDocument } from '../../../shared';
import { EditConfirmationDocumentComponent } from '../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';

@Component({
  selector: 'app-edit-confirmation-document-dialog',
  templateUrl: './edit-confirmation-document-dialog.component.html',
  styleUrls: ['./edit-confirmation-document-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditConfirmationDocumentDialogComponent implements OnInit {
  @ViewChild(EditConfirmationDocumentComponent) confirmationProofDocumentComponent: EditConfirmationDocumentComponent;

  constructor(public dialogRef: MatDialogRef<EditConfirmationDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $document: BehaviorSubject<ConfirmationDocument> }) { }

  ngOnInit() {
    let s = this;
  }

  isValid() {
    return this.confirmationProofDocumentComponent && this.confirmationProofDocumentComponent.confirmationDocumentForm
      && this.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
  }

  save() {
    let document = new ConfirmationDocument(this.confirmationProofDocumentComponent.confirmationDocumentForm.value["name"],
      this.confirmationProofDocumentComponent.confirmationDocumentForm.value["series"],
      this.confirmationProofDocumentComponent.confirmationDocumentForm.value["number"],
      this.confirmationProofDocumentComponent.confirmationDocumentForm.value["dateIssue"],
      this.confirmationProofDocumentComponent.confirmationDocumentForm.value["dateExpired"],
      this.data.$document.getValue().id)
    this.data.$document.next(document);
    this.dialogRef.close();
  }
}
