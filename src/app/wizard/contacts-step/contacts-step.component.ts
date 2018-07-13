import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { FormService } from '../../shared/index';
import { MatCheckboxChange } from '@angular/material';


@Component({
  selector: 'app-contacts-step',
  templateUrl: './contacts-step.component.html',
  styleUrls: ['./contacts-step.component.css']
})
export class ContactsStepComponent implements OnInit {

  constructor(private formService: FormService, private fb: FormBuilder) { }
  private emailValidators: ValidatorFn[] = [Validators.required,Validators.email];
  masks = {
    smsPhone: ["+", /\d/, "(", /\d/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]
  }

  
  onChange = (() => {
    let updateValidators = (name: string, validators: ValidatorFn[])=>{
      if (!name || name == "" || !validators) return;
      let control = this.contactsForm.get(name);
      control.clearValidators();
      if (validators.length > 0) control.setValidators(validators);
      control.updateValueAndValidity();
    }
    return {
      byEmail: (change: MatCheckboxChange) => {
        if (change.checked) {
          updateValidators("email", this.emailValidators);
          updateValidators("bySms", []);
        } else {
          updateValidators("email", []);
          updateValidators("bySms", [Validators.requiredTrue]);
        }
      },
      bySms: (change: MatCheckboxChange) => {
        if (change.checked) {
          updateValidators("smsPhone", [Validators.required, Validators.pattern("^\\+\\d\\(\\d\\d\\d\\)\\d\\d\\d-\\d\\d-\\d\\d$")]);
          updateValidators("byEmail", []);
        } else {
          updateValidators("smsPhone", []);
          updateValidators("byEmail", [Validators.requiredTrue]);
        }
      }
    }
  })();
  contactsForm: FormGroup
  formErrors = {
    byEmail: "",
    bySms: "",
    email: "",
    smsPhone: "",
    phones: "",
  };
  validationMessages = {
    byEmail: {
      "required": "Не выбран тип оповещения.",
    },
    bySms: {
      "required": "Не выбран тип оповещения.",
    },
    email: {
      "required": "Обязательное поле.",
      "email": "Введите адрес в формате mail@mail.ru"
    },
    smsPhone: {
      "required": "Обязательное поле.",
      "pattern": "Введите номер в формате +9 999 999 99 99"
    },
    phones: {
      "pattern": "Введите телефон(ы) через запятую в формате 10 цифр без пробелов и иных символов.",
      "maxlength": "Максимальная длина - 250 символов."
    }
  }

  ngOnInit() {
    this.buildForm();
  }
  isValid() {
    return this.contactsForm && this.contactsForm.valid;
  }

  private buildForm() {
    this.contactsForm = this.fb.group({
      "byEmail": [
        true,
        []
      ],
      "bySms": [
        false,
        []
      ],
      "email": [
        "",
        this.emailValidators
      ],
      "smsPhone": [
        "",
        []
      ],
      "phones": [
        "",
        [
          Validators.pattern("^(\\s*\,?\\s*\\d{10})*"),
          Validators.maxLength(250)
        ]
      ]
    })
    this.contactsForm.valueChanges.subscribe(() => this.formService.onValueChange(this.contactsForm, this.formErrors, this.validationMessages, false));
    this.formService.onValueChange(this.contactsForm, this.formErrors, this.validationMessages, false);
  }


}
