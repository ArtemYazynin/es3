import { Component, OnInit, ChangeDetectionStrategy, Inject, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { Parent, SpecHealth, ConfirmationDocument, ConfigsOfRoutingButtons, Child } from '../../../shared';
import { EditSpecHealthComponent } from '../../../shared/components/edit-spec-health/edit-spec-health.component';

@Component({
  selector: 'app-spec-health-dialog',
  templateUrl: './spec-health-dialog.component.html',
  styleUrls: ['./spec-health-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthDialogComponent implements OnInit {
  @ViewChild(EditSpecHealthComponent) editSpecHealthComponent: EditSpecHealthComponent;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<SpecHealthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $specHealth: BehaviorSubject<SpecHealth>, $children: Array<BehaviorSubject<Child>> }) { }

  ngOnInit() {
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        this.data.$specHealth.next(this.editSpecHealthComponent.specHealth);
        this.data.$children.forEach(subject => {
          let child = subject.getValue();
          if (this.editSpecHealthComponent.editConfirmationDocimentComponents.length > 0) {
            child.specHealthDocument = this.editSpecHealthComponent.editConfirmationDocimentComponents.find(x => x.model.id == child.specHealthDocument.id).getResult();
          }
          subject.next(child);
        });
        this.dialogRef.close();

      },
      inverseAction: () => {
        this.dialogRef.close();
      }
    }
  }

  isValid() { return true; }
}
