import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ConfigsOfRoutingButtons, Theme } from '../../../shared';
import { EditCurrentEducationPlaceComponent } from '../shared/components/edit-current-education-place/edit-current-education-place.component';
import { CurrentEducationPlace } from './../../../shared/models/current-education-place.model';

@Component({
  selector: 'app-current-education-place-dialog',
  templateUrl: './edit-current-education-place-dialog.component.html',
  styleUrls: ['./edit-current-education-place-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditCurrentEducationPlaceDialogComponent implements OnInit {
  @ViewChild(EditCurrentEducationPlaceComponent) currentEducationPlaceEditComponent: EditCurrentEducationPlaceComponent;

  constructor(public dialogRef: MatDialogRef<EditCurrentEducationPlaceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $currentEducationPlace: BehaviorSubject<CurrentEducationPlace>, inquiryType: string }) { }

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.config = this.getConfig();
  }

  getConfig(){
    return new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let currentEducationPlace = this.currentEducationPlaceEditComponent.getResult();
        this.data.$currentEducationPlace.next(currentEducationPlace);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      });
  }

  isValid() {
    return this.currentEducationPlaceEditComponent && this.currentEducationPlaceEditComponent.isValid()
  }
}
