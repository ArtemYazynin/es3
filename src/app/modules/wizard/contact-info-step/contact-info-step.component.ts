import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FormService, Inquiry, inquiryType } from '../../../shared';
import { ControlInfo } from '../../../shared/models/controlInfo';
import { ContactInfo, StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-contact-info-step',
  templateUrl: './contact-info-step.component.html',
  styleUrls: ['./contact-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactInfoStepComponent implements OnInit, StepBase {
  private emailValidators: ValidatorFn[] = [Validators.required, Validators.email];
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private formService: FormService, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.buildForm();
    const inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    if (!inquiry.contactInfo) return;
    this.contactsForm.patchValue({
      byEmail: inquiry.contactInfo.byEmail,
      bySms: inquiry.contactInfo.bySms,
      dontNotify: inquiry.contactInfo.dontNotify,
      email: inquiry.contactInfo.email,
      smsPhone: inquiry.contactInfo.smsPhone,
      phones: inquiry.contactInfo.phones
    });
    if (this.contactsForm.controls.dontNotify.value == true) {
      this.contactsForm.controls.email.clearValidators();
      this.isDontNotify(true);
      this.contactsForm.updateValueAndValidity();
    }
  }

  isValid() {
    return this.contactsForm && this.contactsForm.valid;
  }

  isDontNotify(option: boolean): void {
    if (option) {
      this.contactsForm.controls.email.disable();
      this.contactsForm.controls.smsPhone.disable();
      this.contactsForm.controls.phones.disable();
    } else {
      this.contactsForm.controls.email.enable();
      this.contactsForm.controls.smsPhone.enable();
      this.contactsForm.controls.phones.enable();
    }
  }

  masks = { smsPhone: ["+", /\d/, "(", /\d/, /\d/, /\d/, ")", /\d/, /\d/, /\d/, "-", /\d/, /\d/, "-", /\d/, /\d/] }
  onChange = (() => {
    const smsPhonePattern = "^\\+\\d\\(\\d\\d\\d\\)\\d\\d\\d-\\d\\d-\\d\\d$";
    return {
      byEmail: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("email", this.emailValidators), new ControlInfo("bySms", [])]);
          this.contactsForm.controls.dontNotify.setValue(false);
          this.isDontNotify(false);
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
          this.isDontNotify(false);
        } else {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("smsPhone", []), new ControlInfo("byEmail", [Validators.requiredTrue])]);
        }
      },
      dontNotify: (change: MatCheckboxChange) => {
        if (change.checked) {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("bySms", []), new ControlInfo("byEmail", []), new ControlInfo("email", []), new ControlInfo("smsPhone", [])]);
          this.contactsForm.patchValue({
            byEmail: false, bySms: false, email: "", smsPhone: "", phones: ""
          });
          this.isDontNotify(true);
        } else {
          this.formService.updateValidators(this.contactsForm,
            [new ControlInfo("bySms", [Validators.requiredTrue]), new ControlInfo("byEmail", [Validators.requiredTrue])]);
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
}
