import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, Petition, Theme } from '../../../shared';
import { EditPetitionComponent } from '../shared/components/edit-petition/edit-petition.component';

@Component({
  selector: 'app-edit-petition-dialog',
  templateUrl: './edit-petition-dialog.component.html',
  styleUrls: ['./edit-petition-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetitionDialogComponent implements OnInit {
  @ViewChild(EditPetitionComponent) editPetitionComponent: EditPetitionComponent;

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditPetitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $petition: BehaviorSubject<Petition> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let petition = this.editPetitionComponent.getResult();
        this.data.$petition.next(petition);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      }
    );
  }
  isValid() {
    return this.editPetitionComponent && this.editPetitionComponent.isValid()
  }
}
