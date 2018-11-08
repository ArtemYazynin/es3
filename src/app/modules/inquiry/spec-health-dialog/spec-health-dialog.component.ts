import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { Parent, SpecHealth, ConfirmationDocument, ConfigsOfRoutingButtons } from '../../../shared';

@Component({
  selector: 'app-spec-health-dialog',
  templateUrl: './spec-health-dialog.component.html',
  styleUrls: ['./spec-health-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthDialogComponent implements OnInit {
  config: ConfigsOfRoutingButtons;
  
  constructor(public dialogRef: MatDialogRef<SpecHealthDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: { $specHealth: Observable<SpecHealth>, $children: Array<BehaviorSubject<ConfirmationDocument>> }) { }

  ngOnInit() {
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        // if (this.relationTypeComponent.owner.relationType) {
        //   if (this.parent.relationType.id !== this.relationTypeComponent.owner.relationType.id)
        //     this.parent.relationType = this.relationTypeComponent.owner.relationType;

        //   (() => {
        //     this.parent.parentRepresentChildrenDocument = this.relationTypeComponent.owner.relationType.confirmationDocument
        //       ? this.relationTypeComponent.editConfirmationDocumentComponent.getResult()
        //       : undefined;
        //   })();
        // }
        // this.data.$parent.next(this.parent);
        this.dialogRef.close();

      },
      inverseAction: () => {
        this.dialogRef.close();
      }
    }
  }

  isValid(){return true;}
}
