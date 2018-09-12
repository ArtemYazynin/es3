import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ValidatorFn } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { StepBase, WizardStorageService, ContactInfo, Inquiry } from '../shared';
import { FormService, inquiryType } from '../../../shared';


@Component({
  selector: 'app-contact-info-step',
  templateUrl: './contact-info-step.component.html',
  styleUrls: ['./contact-info-step.component.css']
})
export class ContactInfoStepComponent implements OnInit, StepBase {

  constructor(private formService: FormService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  private emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  masks = {
    smsPhone: ["+", /\d/, "(", /\d/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/]
  }

  onChange = (() => {
    return {
      byEmail: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm, "email", this.emailValidators);
          this.formService.updateValidators(this.contactsForm, "bySms", []);
        } else {
          this.formService.updateValidators(this.contactsForm, "email", []);
          this.formService.updateValidators(this.contactsForm, "bySms", [Validators.requiredTrue]);
        }
      },
      bySms: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm, "smsPhone", [Validators.required, Validators.pattern("^\\+\\d\\(\\d\\d\\d\\)\\d\\d\\d-\\d\\d-\\d\\d$")]);
          this.formService.updateValidators(this.contactsForm, "byEmail", []);
        } else {
          this.formService.updateValidators(this.contactsForm, "smsPhone", []);
          this.formService.updateValidators(this.contactsForm, "byEmail", [Validators.requiredTrue]);
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
  goTo = {
    back: () => {
      this.router.navigate(["../parentStep"], { relativeTo: this.route });
    },
    next: () => {
      (() => {
        const contactInfo = new ContactInfo(this.contactsForm);
        this.storageService.set(this.inquiryType, { contactInfo: contactInfo })
      })();

      if (this.inquiryType == inquiryType.healthCamp) {
        this.router.navigate(["../jobInfoStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../privilegeStep"], { relativeTo: this.route });
      }
    }
  }
  ngOnInit() {
    this.buildForm();
    const inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    if (!inquiry.contactInfo) return;
    this.contactsForm.patchValue({
      byEmail: inquiry.contactInfo.byEmail,
      bySms: inquiry.contactInfo.bySms,
      email: inquiry.contactInfo.email,
      smsPhone: inquiry.contactInfo.smsPhone,
      phones: inquiry.contactInfo.phones,
    });
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