import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, Parent } from '../../../shared';
import { RelationTypeComponent } from '../../../shared/components/relation-type/relation-type.component';

@Component({
  selector: 'app-relation-type-dialog',
  templateUrl: './relation-type-dialog.component.html',
  styleUrls: ['./relation-type-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationTypeDialogComponent implements OnInit {
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;

  config: ConfigsOfRoutingButtons;
  parent: Parent;

  constructor(public dialogRef: MatDialogRef<RelationTypeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { $owner: BehaviorSubject<Parent> }) { }

  ngOnInit() {
    this.parent = this.data.$owner.getValue();
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        if (this.relationTypeComponent.owner.relationType) {
          if (this.parent.relationType.id !== this.relationTypeComponent.owner.relationType.id)
            this.parent.relationType = this.relationTypeComponent.owner.relationType;

          (() => {
            this.parent.parentRepresentChildrenDocument = this.relationTypeComponent.owner.relationType.confirmationDocument
              ? this.relationTypeComponent.editConfirmationDocumentComponent.getResult()
              : undefined;
          })();
        }
        this.data.$owner.next(this.parent);
        this.dialogRef.close();

      },
      () => {
        this.dialogRef.close();
      }
    );
  }

  isValid() {
    var isDirtyRelType = this.relationTypeComponent && this.relationTypeComponent.relationForm.dirty;
    var isDirtyConfDoc = this.relationTypeComponent.editConfirmationDocumentComponent
      && this.relationTypeComponent.editConfirmationDocumentComponent.confirmationDocumentForm.dirty;

    return this.relationTypeComponent && this.relationTypeComponent.isValid() && (isDirtyRelType || isDirtyConfDoc);
  }
}
