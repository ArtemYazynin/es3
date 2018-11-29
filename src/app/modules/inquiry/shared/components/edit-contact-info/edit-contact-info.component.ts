import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { FormService, Theme } from '../../../../../shared';
import { ControlInfo } from '../../../../../shared/models/controlInfo.model';
import { ContactInfo } from '../../../../wizard/shared';

@Component({
  selector: 'app-edit-contact-info',
  templateUrl: './edit-contact-info.component.html',
  styleUrls: ['./edit-contact-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditContactInfoComponent implements OnInit {
  @Input() contactInfo: ContactInfo;
  private emailValidators: ValidatorFn[] = [Validators.required, Validators.email];

  constructor(private formService: FormService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.updateForm();
  }

  isValid() {
    return this.contactsForm && this.contactsForm.valid;
  }
  themes = Theme;
  masks = { smsPhone: ["+", /\d/, "(", /\d/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/] }
  onChange = (() => {
    const smsPhonePattern = "^\\+\\d\\(\\d\\d\\d\\)\\d\\d\\d-\\d\\d-\\d\\d$";
    return {
      byEmail: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("email", this.emailValidators), new ControlInfo("bySms", [])]);
          this.contactsForm.controls.dontNotify.setValue(false);
        } else {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("email", []), new ControlInfo("bySms", [Validators.requiredTrue])]);
        }
      },
      bySms: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("smsPhone", [Validators.required, Validators.pattern(smsPhonePattern)]), new ControlInfo("byEmail", [])]);
          this.contactsForm.controls.dontNotify.setValue(false);
        } else {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("smsPhone", []), new ControlInfo("byEmail", [Validators.requiredTrue])]);
        }
      },
      dontNotify: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("bySms", []), new ControlInfo("byEmail", []), new ControlInfo("smsPhone", []), new ControlInfo("email", [])]);
          this.contactsForm.patchValue({ byEmail: false, bySms: false });
        } else {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("byEmail", [Validators.requiredTrue]), new ControlInfo("bySms", [Validators.requiredTrue])]);
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
    phones: ""
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
      "dontNotify": [
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
          Validators.pattern("^(\\d{10}\\s*\,?\\s*)*"),
          Validators.maxLength(250)
        ]
      ]
    })
    this.contactsForm.valueChanges.subscribe(() => this.formService.onValueChange(this.contactsForm, this.formErrors, this.validationMessages, false));
    this.formService.onValueChange(this.contactsForm, this.formErrors, this.validationMessages, false);
  }

  private updateForm() {
    if (!this.contactInfo) return;
    this.contactsForm.patchValue({
      byEmail: this.contactInfo.byEmail,
      bySms: this.contactInfo.bySms,
      dontNotify: this.contactInfo.dontNotify,
      email: this.contactInfo.email,
      smsPhone: this.contactInfo.smsPhone,
      phones: this.contactInfo.phones
    });
    if (this.contactsForm.controls.dontNotify.value || !this.contactInfo.byEmail) {
      this.contactsForm.controls.email.clearValidators();
      this.contactsForm.controls.email.updateValueAndValidity();
    }
  }

  getResult(){
    let newData = ContactInfo.buildByForm(this.contactsForm);
    Object.assign(this.contactInfo, newData);
    return this.contactInfo;
  }
}
