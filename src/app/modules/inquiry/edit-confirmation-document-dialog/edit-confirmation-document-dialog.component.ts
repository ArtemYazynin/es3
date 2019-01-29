import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { EditConfirmationDocumentComponent } from '../../../shared/barrel-components';
import { ConfigsOfRoutingButtons, ConfirmationDocument, Theme } from '../../../shared/index';
import { Guid } from '../../../shared/models/guid';

@Component({
  selector: 'app-edit-confirmation-document-dialog',
  templateUrl: './edit-confirmation-document-dialog.component.html',
  styleUrls: ['./edit-confirmation-document-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditConfirmationDocumentDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditConfirmationDocumentComponent) confirmationProofDocumentComponent: EditConfirmationDocumentComponent;

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditConfirmationDocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $document: BehaviorSubject<ConfirmationDocument> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons();
  }

  ngAfterViewInit(): void {
    this.config.primaryAction = () => {
      const oldDocument = this.data.$document.getValue();
      let document = ConfirmationDocument.construct(this.confirmationProofDocumentComponent.form, oldDocument ? oldDocument.id : Guid.newGuid());
      this.data.$document.next(document);
      this.dialogRef.close();
    };
    this.config.inverseAction = () => {
      this.dialogRef.close();
    }
  }

  isValid() {
    return this.confirmationProofDocumentComponent && this.confirmationProofDocumentComponent.form.dirty
      && this.confirmationProofDocumentComponent.isValid();
  }
}
