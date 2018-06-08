import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from "@angular/forms";
import {
  Applicant,
  IdentityCardType,
  IdentityCard,
  Countries,
  RelationTypes,
  ApplicantType,
  Person,
  Representative
} from "../shared/index";
import { IdentityCardComponent } from '../identity-card/identity-card.component';
import { Subscription } from 'rxjs/Subscription';
import { ConfirmationDocumentComponent } from '../confirmation-document/confirmation-document.component';
import { isNullOrUndefined } from 'util';
import { isEmpty } from 'rxjs/operator/isEmpty';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  private noMiddlenameSubscription: Subscription;
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";

  applicantForm: FormGroup;
  applicant: Applicant = new Applicant();
  countries = Countries;
  relationTypes = RelationTypes;
  applicantTypeEnum = ApplicantType;


  applicantTypes = (() => {
    let result: Array<any> = [];
    let groupOfId = ApplicantType.values();
    groupOfId.forEach(key => {
      result.push({
        id: key,
        name: ApplicantType[key]
      });
    });
    return result;
  })()

  formErrors = Representative.getFormErrorsTemplate();
  validationMessages = Representative.getvalidationMessages();

  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  @ViewChild(ConfirmationDocumentComponent)
  confirmationDocumentComponent: ConfirmationDocumentComponent

  private subscribeToMiddlename(): void {
    let toggleMiddlenameValidators = noMiddlename => {
      const middlename = this.applicantForm.get('middlename');
      /** Массив валидаторов */
      const middlenameValidators: ValidatorFn[] = [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(this.fioRegExp)
      ];

      /** если есть отчество, добавляет валидаторы, если нет, очищает */
      middlename.clearValidators();
      if (!noMiddlename) {
        middlename.setValidators(middlenameValidators);
      }
      /** Обновляем состояние контрола */
      middlename.updateValueAndValidity();
    }
    this.noMiddlenameSubscription = this.applicantForm.get('noMiddlename')
      .valueChanges
      .subscribe(value => toggleMiddlenameValidators(value));
  }
  ngOnDestroy() {
    this.noMiddlenameSubscription.unsubscribe();
  }

  isValid = {
    applicantStep(appForm, identityCardForm, countryStateDocument) {
      var isValidCountryStateDocument = (() => {
        if (isNullOrUndefined(appForm.value.citizenship) || appForm.value.citizenship === "") return false;
        if (parseInt(appForm.value.citizenship) === Countries.find(x => x.name === "Россия").id) return true;
        if (!countryStateDocument) return false;
        return countryStateDocument.valid;
      })();
      var isValidIdentityCardForm = identityCardForm ? identityCardForm.valid : false;
      return appForm.valid && isValidIdentityCardForm && isValidCountryStateDocument;
    }
  }
  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.applicant.representative.IdentityCard.identityCardType = IdentityCardType["Паспорт РФ"];
    this.applicant.representative.citizenship = "";
    this.applicant.representative.relationType = this.relationTypes[0].id;

    /** begin временно, удалить в будущем */
    this.applicant.representative.lastname = "ластнейм";
    this.applicant.representative.firstname = "фёстнейм";
    this.applicant.representative.middlename = "миддлнейм";
    this.applicant.representative.snils = "222-222-222 43";
    /** end */
    this.buildForm();
    this.subscribeToMiddlename();
  }
  private buildForm() {
    this.applicantForm = this.fb.group({
      "lastname": [
        this.applicant.representative.lastname,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "firstname": [
        this.applicant.representative.firstname,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "middlename": [
        this.applicant.representative.middlename, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "noMiddlename": [
        this.applicant.noMiddlename, []
      ],
      "snils": [
        this.applicant.representative.snils,
        [
          Validators.required,
          Validators.maxLength(28),
          Validators.pattern("^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$")
        ]
      ],
      "citizenship": [
        this.applicant.representative.citizenship,
        [
          Validators.required
        ]
      ],
      "relationType": [
        this.applicant.representative.relationType,
        []
      ],
      "agree": [
        this.applicant.agree,
        [Validators.requiredTrue]
      ],
      "applicantType": [
        this.applicant.applicantType,
        []
      ]
    });
    this.applicantForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    this.formService.onValueChange(this.applicantForm, this.formErrors, this.validationMessages);
  }

  onSubmit() {
    alert("go to the next step");
  }
}
