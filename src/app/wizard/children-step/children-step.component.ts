import { Component, OnInit, ViewChild } from '@angular/core';
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { BirthInfoComponent } from '../../person/birth-info/birth-info.component';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormService, Parent, Person, WizardStorageService, ApplicantType, CitizenshipService, Country } from '../../shared/index';

@Component({
  selector: 'app-children-step',
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css']
})
export class ChildrenStepComponent implements OnInit {

  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  @ViewChild(FullNameComponent)
  fullnameComponent: FullNameComponent

  @ViewChild(BirthInfoComponent)
  birthInfoComponent: BirthInfoComponent

  constructor(private fb: FormBuilder, private formService: FormService, private storageService: WizardStorageService, private citizenshipService: CitizenshipService) { }

  countries: Array<Country> = [];
  childForm: FormGroup;
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());
  isValid(): boolean {
    let isValid = {
      childForm: this.childForm && this.childForm.valid || false,
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false,
    }
    return isValid.childForm && isValid.fullnameForm && isValid.identityCardForm && isValid.birthInfoForm;
  }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
      });
    this.buildForm();
  }
  private buildForm() {
    this.childForm = this.fb.group({
      "snils": [
        "222-222-222 43",
        [
          Validators.required,
          Validators.maxLength(28),
          Validators.pattern("^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$")
        ]
      ],
      "citizenship": [
        "",
        [
          Validators.required
        ]
      ]
    });
    this.childForm.valueChanges
      .subscribe(data => this.formService.onValueChange(this.childForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.childForm, this.formErrors, this.validationMessages);
  }
}
