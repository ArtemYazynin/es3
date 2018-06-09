import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import {
  Applicant,
  IdentityCardType,
  IdentityCard,
  Countries,
  RelationTypes,
  ApplicantType,
  Person,
  Parent,
  FormService
} from "../../shared/index";
import { IdentityCardComponent } from '../../identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit {

  private noMiddlenameSubscription: Subscription;
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";

  parentForm: FormGroup;
  applicant: Applicant = new Applicant();
  countries = Countries;
  relationTypes = RelationTypes;
  applicantTypeEnum = ApplicantType;
  
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
  };
  isAvailable = {
    parent: {
      countryStateDocument: () => {
        return this.parentForm.value.citizenship && parseInt(this.parentForm.value.citizenship) !== Countries.find(x => x.name === "Россия").id;
      },
      representChildrenInterestsDocument: () => { 
        let relationType = this.relationTypes.find(x=>x.id === this.parentForm.value.relationType);
        return parseInt(relationType.ConfirmationDocument) === 1;
      },
    }
  };
  formErrors = Parent.getFormErrorsTemplate();
  validationMessages = Parent.getvalidationMessages();

  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  @ViewChild(ConfirmationDocumentComponent)
  confirmationDocumentComponent: ConfirmationDocumentComponent

  private subscribeToMiddlename(): void {
    let toggleMiddlenameValidators = noMiddlename => {
      const middlename = this.parentForm.get('middlename');
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
    this.noMiddlenameSubscription = this.parentForm.get('noMiddlename')
      .valueChanges
      .subscribe(value => toggleMiddlenameValidators(value));
  }
  ngOnDestroy() {
    this.noMiddlenameSubscription.unsubscribe();
  }
  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.applicant.parent.IdentityCard.identityCardType = IdentityCardType["Паспорт РФ"];
    this.applicant.parent.citizenship = "";
    this.applicant.parent.relationType = this.relationTypes[0].id;

    /** begin временно, удалить в будущем */
    this.applicant.parent.lastname = "ластнейм";
    this.applicant.parent.firstname = "фёстнейм";
    this.applicant.parent.middlename = "миддлнейм";
    this.applicant.parent.snils = "222-222-222 43";
    /** end */
    this.buildForm();
    this.subscribeToMiddlename();
  }



  private buildForm() {
    this.parentForm = this.fb.group({
      "lastname": [
        this.applicant.parent.lastname,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "firstname": [
        this.applicant.parent.firstname,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "middlename": [
        this.applicant.parent.middlename, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "noMiddlename": [
        this.applicant.noMiddlename, []
      ],
      "snils": [
        this.applicant.parent.snils,
        [
          Validators.required,
          Validators.maxLength(28),
          Validators.pattern("^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$")
        ]
      ],
      "citizenship": [
        this.applicant.parent.citizenship,
        [
          Validators.required
        ]
      ],
      "relationType": [
        this.applicant.parent.relationType,
        []
      ],
      "agree": [
        this.applicant.agree,
        [Validators.requiredTrue]
      ]
    });
    this.parentForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  private onValueChange(data?: any) {
    this.formService.onValueChange(this.parentForm, this.formErrors, this.validationMessages);
  }

  onSubmit() {
    alert("go to the next step");
  }

}
