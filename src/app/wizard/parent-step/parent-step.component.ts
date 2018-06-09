import { Component, OnInit, ViewChild } from '@angular/core';
import { MatRadioModule } from '@angular/material/radio';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from "@angular/forms";
import { Subscription } from 'rxjs/Subscription';
import { isNullOrUndefined } from 'util';
import {
  IdentityCardType,
  IdentityCard,
  Countries,
  RelationTypes,
  Person,
  Parent,
  FormService
} from "../../shared/index";
import { IdentityCardComponent } from '../../identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { WizardStorageService } from '../../shared/wizard-storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit {
  private inquiryType: string;
  private noMiddlenameSubscription: Subscription;
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";

  parentForm: FormGroup;
  parent: Parent = new Parent();
  countries = Countries;
  relationTypes = RelationTypes;

  isValid = {
    parentStep(appForm, identityCardForm, countryStateDocument) {
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
        let relationType = this.relationTypes.find(x => x.id === this.parentForm.value.relationType);
        return parseInt(relationType.ConfirmationDocument) === 1;
      },
    }
  };
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());

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
  constructor(private fb: FormBuilder,
    private formService: FormService,
    private storageService: WizardStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });

    this.parent.IdentityCard.identityCardType = IdentityCardType["Паспорт РФ"];
    this.parent.citizenship = "";
    this.parent.relationType = this.relationTypes[0].id;

    /** begin временно, удалить в будущем */
    this.parent.person.lastname = "ластнейм";
    this.parent.person.firstname = "фёстнейм";
    this.parent.person.middlename = "миддлнейм";
    this.parent.person.snils = "222-222-222 43";
    /** end */
    this.buildForm();
    this.subscribeToMiddlename();
  }

  private buildForm() {
    this.parentForm = this.fb.group({
      "lastname": [
        this.parent.person.lastname,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "firstname": [
        this.parent.person.firstname,
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "middlename": [
        this.parent.person.middlename, [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "noMiddlename": [
        this.parent.person.noMiddlename, []
      ],
      "snils": [
        this.parent.person.snils,
        [
          Validators.required,
          Validators.maxLength(28),
          Validators.pattern("^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$")
        ]
      ],
      "citizenship": [
        this.parent.citizenship,
        [
          Validators.required
        ]
      ],
      "relationType": [
        this.parent.relationType,
        []
      ],
      "agree": [
        this.parent.agree,
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
