import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { EditFullNameComponent } from '../../../../../shared/components/edit-full-name/edit-full-name.component';
import { GenderComponent } from '../../../../../shared/components/gender/gender.component';
import { IdentityCardComponent } from '../../../../../shared/components/identity-card/identity-card.component';
import { SnilsComponent } from '../../../../../shared/components/snils/snils.component';
import { Applicant, CitizenshipService, Country, IdentityCard, IdentityCardType, Parent, Person } from '../../../../../shared/index';
import { PersonType } from '../../../../../shared/person-type.enum';
import { CountryService } from '../../../../../shared/country.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonComponent implements OnInit, OnDestroy {
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(EditFullNameComponent) fullnameComponent: EditFullNameComponent;
  @ViewChild(GenderComponent) genderComponent: GenderComponent;

  @Input() model: Parent | Applicant;
  @Input() personType: PersonType;

  private subscription: Subscription;
  personTypes = PersonType;
  groupOfIdentityCardTypeId: Array<number> = [];
  countries: Array<Country> = [];

  constructor(private countryService: CountryService) { }

  ngOnInit() {
    this.subscription = this.countryService.gets().subscribe(countries => this.countries = countries);
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
    const isValidIdentityCard = this.isValidIdentityCard();
    const isValidFullName = this.isValidFullName();
    const isValidSnils = this.snilsComponent.isValid();
    let result = isValidFullName && isValidSnils && isValidIdentityCard
    return result;
  }

  private isValidIdentityCard(){
    const isValidForm = !!this.identityCardComponent && !!this.identityCardComponent.identityCardForm
      && this.identityCardComponent.identityCardForm.valid;
    return isValidForm;
  }

  private isValidFullName(){
    var isValidForm = !!this.fullnameComponent && !!this.fullnameComponent.fullnameForm
      && this.fullnameComponent.fullnameForm.valid;
    return isValidForm ;
  }

  getResult(): Person {
    const fullnameForm = this.fullnameComponent.fullnameForm;
    this.model = this.model || {} as Parent | Applicant;
    this.model.lastname = fullnameForm.controls.lastname.value;
    this.model.firstname = fullnameForm.controls.firstname.value;
    this.model.middlename = fullnameForm.controls["middlename".concat(this.fullnameComponent.id)].value;
    this.model.snils = this.snilsComponent.snils;
    this.model.noMiddlename = fullnameForm.controls["noMiddlename".concat(this.fullnameComponent.id)].value;
    Object.assign(this.model, {
      identityCard: new IdentityCard(this.identityCardComponent.identityCardForm)
    });
    if (this.genderComponent) this.model.gender = this.genderComponent.gender;

    return this.model;
  }
}