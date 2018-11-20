import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ButtonsTitles, ConfigsOfRoutingButtons, Petition } from '../../../shared';
import { EditPetitionComponent } from '../shared/components/edit-petition/edit-petition.component';

@Component({
  selector: 'app-edit-petition-dialog',
  templateUrl: './edit-petition-dialog.component.html',
  styleUrls: ['./edit-petition-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetitionDialogComponent implements OnInit {
  @ViewChild(EditPetitionComponent) editPetitionComponent: EditPetitionComponent;
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditPetitionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $petition: BehaviorSubject<Petition> }) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Save, ButtonsTitles.Close,
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
