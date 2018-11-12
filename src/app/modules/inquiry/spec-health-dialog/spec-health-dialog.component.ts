import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { Child, ConfigsOfRoutingButtons, SpecHealth } from '../../../shared';
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
        if (this.editSpecHealthComponent.$specHealth.getValue().id != this.editSpecHealthComponent.specHealth.id) {
          this.data.$specHealth.next(this.editSpecHealthComponent.specHealth);
        }

        this.data.$children.forEach(subject => {
          let child = subject.getValue();
          if (this.editSpecHealthComponent.editConfirmationDocimentComponents.length > 0) {
            const newdoc = this.editSpecHealthComponent.editConfirmationDocimentComponents.find(x => x.model.id == child.specHealthDocument.id).getResult();
            if (!newdoc.equals(child.specHealthDocument)) {
              child.specHealthDocument = newdoc;
              subject.next(child);
            }
          }

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
