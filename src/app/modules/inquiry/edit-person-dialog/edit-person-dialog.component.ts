import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ApplicantType, Child, ConfigsOfRoutingButtons, Person, Theme } from '../../../shared';
import { BirthInfoComponent } from '../../../shared/components/birth-info/birth-info.component';
import { DisabilityComponent } from '../../../shared/components/disability/disability.component';
import { PersonType } from '../../../shared/person-type.enum';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(DisabilityComponent) disabilityComponent: DisabilityComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;

  applicantTypes = ApplicantType;
  personTypes = PersonType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $person: BehaviorSubject<Person>, personType: PersonType, inquiryType: string }) { }

  themes = Theme;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(undefined, undefined,
      () => {
        let person = (() => {
          let result = this.editPersonComponent.getResult();
          if (this.data.personType == PersonType.Child) {
            (result as Child).birthDate = this.birthInfoComponent.birthInfoForm.controls.birthDate.value;
            (result as Child).birthPlace = this.birthInfoComponent.birthInfoForm.controls.birthPlace.value;
            (result as Child).disabledChild = this.disabilityComponent.disabledChild;
            (result as Child).disabilityType = this.disabilityComponent.disabilityType || undefined;
          }
          return result;
        })();

        this.data.$person.next(person);
        this.dialogRef.close();
      },
      () => {
        this.dialogRef.close();
      }
    );
  }

  isValid = (): boolean => {
    const isValidPerson = this.editPersonComponent && this.editPersonComponent.isValid();
    if (this.data.personType == PersonType.Child) {
      return isValidPerson && this.birthInfoComponent && this.birthInfoComponent.birthInfoForm.valid;
    }
    return isValidPerson
  }
}

