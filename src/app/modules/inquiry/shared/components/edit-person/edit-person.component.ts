import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullNameComponent } from '../../../../../shared/components/full-name/full-name.component';
import { GenderComponent } from '../../../../../shared/components/gender/gender.component';
import { IdentityCardComponent } from '../../../../../shared/components/identity-card/identity-card.component';
import { SnilsComponent } from '../../../../../shared/components/snils/snils.component';
import { Applicant, ApplicantType, AttachmentType, CitizenshipService, ConfirmationDocument, Country, IdentityCardType, Parent, Person, IdentityCard } from '../../../../../shared/index';
import { PersonType } from '../../../../../shared/person-type.enum';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonComponent implements OnInit, OnDestroy {
  //@ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(GenderComponent) genderComponent: GenderComponent;

  @Input() model: Parent | Applicant;
  @Input() personType: PersonType;

  private subscription: Subscription;
  personTypes = PersonType;
  groupOfIdentityCardTypeId: Array<number> = [];
  countries: Array<Country> = [];

  constructor(private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.subscription = this.citizenshipService.getCountries().subscribe(result => this.countries = result);
    switch (this.personType) {
      case PersonType.Child:
        this.groupOfIdentityCardTypeId = [
          IdentityCardType["Паспорт РФ"],
          IdentityCardType["Свидетельство о рождении РФ"],
          IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"],
          IdentityCardType["Иностранный паспорт"]
        ];
        break;

      default:
        break;
    }

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValid(): boolean {
    let isValid = {
      identityCardForm: !!this.identityCardComponent && !!this.identityCardComponent.identityCardForm && this.identityCardComponent.identityCardForm.valid,
      fullnameForm: !!this.fullnameComponent && !!this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid,
    }

    let result = isValid.fullnameForm
      && this.snilsComponent.isValid()
      && isValid.identityCardForm
    return result;
  }

  getResult(): Person {
    const fullnameForm = this.fullnameComponent.fullnameForm;
    let person = new Person(fullnameForm.controls.lastname.value, fullnameForm.controls.firstname.value,
      fullnameForm.controls["middlename".concat(this.fullnameComponent.id)].value,
      this.snilsComponent.snils,
      fullnameForm.controls["noMiddlename".concat(this.fullnameComponent.id)].value);
    person.identityCard = new IdentityCard(this.identityCardComponent.identityCardForm);
    person.id = this.model ? this.model.id : undefined;
    if(this.genderComponent) person.gender = this.genderComponent.gender;
    return person;
  }
}