import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { ApplicantType, ConfigsOfRoutingButtons, IdentityCard, Person, Parent, RelationTypeService } from '../../../shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';
import { PersonType } from '../../../shared/person-type.enum';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit, AfterViewInit {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: { $person: BehaviorSubject<Person>, personType: PersonType },
    private relationTypeService: RelationTypeService, private actionsButtonsService: ActionsButtonsService) { }
    

  private person: Person;
  config: ConfigsOfRoutingButtons;

  ngOnInit() {
    this.person = this.data.$person.getValue();
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        const fullnameForm = this.editPersonComponent.fullnameComponent.fullnameForm;
        let person = new Person(fullnameForm.controls.lastname.value, fullnameForm.controls.firstname.value, 
          fullnameForm.controls["middlename".concat(this.editPersonComponent.fullnameComponent.id)].value, 
          this.editPersonComponent.snilsComponent.snils, 
          fullnameForm.controls["noMiddlename".concat(this.editPersonComponent.fullnameComponent.id)].value);
        person.identityCard = new IdentityCard(this.editPersonComponent.identityCardComponent.identityCardForm);
        person.id = this.person.id;
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
  
  ngAfterViewInit(): void {
    //this.config.primaryAction = this.actionsButtonsService.primaryActionPersonDialog(this.editPersonComponent, this.inquiry, this.data, this.dialogRef);
  }
}

