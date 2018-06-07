import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from "@angular/forms";
import {
  Applicant,
  IdentityCardType,
  IdentityCard,
  Countries,
  RelationTypes
} from "../shared/index";
import { IdentityCardComponent } from '../identity-card/identity-card.component';
import { Subscription } from 'rxjs/Subscription';

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

  // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
  formErrors = {
    "lastname": "",
    "firstname": "",
    "middlename": "",
    "snils": "",
    "citizenship": ""
  };
  // Объект с сообщениями ошибок
  validationMessages = (() => {
    let fioValidationObj: object = {
      "required": "Обязательное поле.",
      "maxlength": "Значение не должно быть больше 50 символов.",
      "pattern": "Имя может состоять только из букв русского алфавита, пробела и дефиса"
    }
    return {
      "lastname": fioValidationObj,
      "firstname": fioValidationObj,
      "middlename": fioValidationObj,
      "snils": {
        "required": "Обязательное поле.",
        "pattern": "Значение должно состоять из целых чисел вида 123-456-789 00"
      },
      "citizenship": {
        "required": "Обязательное поле.",
      }
    }
  })();

  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

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
    applicantStep(appForm, identityCardForm) {
      return appForm.valid && identityCardForm ? identityCardForm.valid : false;
    }
  }
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.applicant.representative.IdentityCard.identityCardType = IdentityCardType["Паспорт РФ"];
    this.applicant.representative.citizenship = "";
    this.applicant.representative.relationType = this.relationTypes[0].id;

    /** begin временно, удалить в будущем */
    this.applicant.representative.lastname = "ластнейм";
    this.applicant.representative.firstname = "фёстнейм";
    this.applicant.representative.middlename = "миддлнейм";
    this.applicant.representative.citizenship = this.countries[1].id.toString();
    this.applicant.snils = "222-222-222 43";
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
        this.applicant.snils,
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
      ]
    });
    this.applicantForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    if (!this.applicantForm) return;
    let form = this.applicantForm;

    for (let field in this.formErrors) {
      this.formErrors[field] = "";
      // form.get - получение элемента управления
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = this.validationMessages[field];
        for (let key in control.errors) {
          this.formErrors[field] += message[key] + " ";
        }
      }
    }
  }

  onSubmit() {
    alert("go to the next step");
  }
}
