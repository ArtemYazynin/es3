import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Parent, RelationTypeService, ConfigsOfRoutingButtons } from '../../../shared';
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

  constructor(public dialogRef: MatDialogRef<RelationTypeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { $parent: BehaviorSubject<Parent> },
    private relationTypeService: RelationTypeService) { }

  ngOnInit() {
    this.parent = this.data.$parent.getValue();
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        if (this.relationTypeComponent.owner.relationType) {
          if (this.parent.relationType.id !== this.relationTypeComponent.owner.relationType.id)
            this.parent.relationType = this.relationTypeComponent.owner.relationType;

          (() => {
            this.parent.parentRepresentChildrenDocument = this.relationTypeComponent.owner.relationType.confirmationDocument
              ? this.relationTypeComponent.editConfirmationDocumentComponent.getResult()
              : undefined;
          })();
        }
        this.data.$parent.next(this.parent);
        this.dialogRef.close();

      },
      inverseAction: () => {
        this.dialogRef.close();
      }
    }
  }

}
