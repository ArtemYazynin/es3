import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person, Parent, FormService, CitizenshipService, Country } from '../../shared/index';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css']
})
export class ApplicantStepComponent implements OnInit {
  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  @ViewChild(ConfirmationDocumentComponent)
  confirmationDocumentComponent: ConfirmationDocumentComponent

  @ViewChild(FullNameComponent)
  fullnameComponent: FullNameComponent

  // @ViewChildren(ConfirmationDocumentComponent)
  // confirmationDocuments: QueryList<ConfirmationDocumentComponent>
  
  constructor(private fb: FormBuilder, private formService: FormService, private citizenshipService: CitizenshipService) { }

  countries: Array<Country> = [];
  applicantForm: FormGroup;
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());
  isAvailable = {
    countryStateDocument: () => {
      return this.applicantForm.value.citizenship && parseInt(this.applicantForm.value.citizenship) !== this.countries.find(x => x.name === "Россия").id;
    }
  }
  isValid(): boolean {
    let isValid = {
      applicantForm: this.applicantForm && this.applicantForm.valid || false,
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      countryStateForm: (() => {
        if (!this.applicantForm || !this.applicantForm.valid) return false;
        if (isNullOrUndefined(this.applicantForm.value.citizenship) || this.applicantForm.value.citizenship === "") return false;
        if (parseInt(this.applicantForm.value.citizenship) === this.countries.find(x => x.name === "Россия").id) return true;
        return this.confirmationDocumentComponent
          && this.confirmationDocumentComponent.confirmationDocumentForm
          && this.confirmationDocumentComponent.confirmationDocumentForm.valid
          || false;
      })()
    }
    return isValid.applicantForm
      && isValid.fullnameForm
      && isValid.identityCardForm
      && isValid.countryStateForm;
  }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
      });
    this.buildForm();
  }
  private buildForm() {
    this.applicantForm = this.fb.group({
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
    this.applicantForm.valueChanges
      .subscribe(data => this.formService.onValueChange(this.applicantForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.applicantForm, this.formErrors, this.validationMessages);
  }
}
