import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationDocument, ConfigsOfRoutingButtons } from '../../../shared';
import { EditConfirmationDocumentComponent } from '../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';
import { Guid } from '../../../shared/models/guid';

@Component({
  selector: 'app-edit-confirmation-document-dialog',
  templateUrl: './edit-confirmation-document-dialog.component.html',
  styleUrls: ['./edit-confirmation-document-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditConfirmationDocumentDialogComponent implements OnInit {
  @ViewChild(EditConfirmationDocumentComponent) confirmationProofDocumentComponent: EditConfirmationDocumentComponent;
  config: ConfigsOfRoutingButtons;
  constructor(public dialogRef: MatDialogRef<EditConfirmationDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $document: BehaviorSubject<ConfirmationDocument> }) { }

  ngOnInit() {
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        const oldDocument = this.data.$document.getValue();
        let document = ConfirmationDocument.construct(this.confirmationProofDocumentComponent.confirmationDocumentForm, oldDocument ? oldDocument.id : Guid.newGuid());
        this.data.$document.next(document);
        this.dialogRef.close();

      },
      inverseAction: () => {
        this.dialogRef.close();
      }
    }
  }

  isValid() {
    return this.confirmationProofDocumentComponent && this.confirmationProofDocumentComponent.confirmationDocumentForm
      && this.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
  }
}
