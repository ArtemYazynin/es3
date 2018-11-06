import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ApplicantType, ConfigsOfRoutingButtons, IdentityCard, Person, Child } from '../../../shared';
import { PersonType } from '../../../shared/person-type.enum';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';
import { DisabilityComponent } from '../../../shared/components/disability/disability.component';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(DisabilityComponent) disabilityComponent: DisabilityComponent;
  applicantTypes = ApplicantType;
  personTypes = PersonType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $person: BehaviorSubject<Person>, personType: PersonType, inquiryType: string }) { }


  private person: Person;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.person = this.data.$person.getValue();
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        let person = (() => {
          let result = this.editPersonComponent.getResult();
          if (this.data.personType == PersonType.Child) {
            (result as Child).disabledChild = this.disabilityComponent.disabledChild;
            (result as Child).disabilityType = this.disabilityComponent.disabilityType || undefined;
          }
          return result;
        })();

        this.data.$person.next(person);
        this.dialogRef.close();
      },
      inverseAction: () => {
        this.dialogRef.close();
      }
    }
  }

  isValid = (): boolean => {
    return this.editPersonComponent && this.editPersonComponent.isValid();
  }
}

