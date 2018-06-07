import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {
  Applicant,
  IdentityCardType,
  IdentityCard,
  Countries
} from "../shared/index";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  applicantForm: FormGroup;
  applicant: Applicant = new Applicant();
  countries = Countries;
  // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
  formErrors = {
    "lastname": "",
    "firstname": "",
    "middlename": "",
    "snils": "",
    "citizenship":""
  };
  // Объект с сообщениями ошибок
  private fioValidationObj: object = {
    "required": "Обязательное поле.",
    "maxlength": "Значение не должно быть больше 50 символов.",
    "pattern": "Имя может состоять только из букв русского алфавита, пробела и дефиса"
  }
  validationMessages = {
    "lastname": this.fioValidationObj,
    "firstname": this.fioValidationObj,
    "middlename": this.fioValidationObj,
    "snils": {
        "required": "Обязательное поле.",
        "pattern": "Значение должно состоять из целых чисел вида 123-456-789 00"
    },
    "citizenship":{
      "required": "Обязательное поле.",
    }
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.applicant.representative.IdentityCard.identityCardType = IdentityCardType["Паспорт РФ"];
    this.applicant.representative.citizenship = "";
    this.buildForm();
  }
  private buildForm() {
    let regExpStr: string="^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";
    this.applicantForm = this.fb.group({
      "lastname": [
        this.applicant.representative.lastname,
        [
          Validators.required, 
          Validators.maxLength(50),
          Validators.pattern(regExpStr)
        ]
      ],
      "firstname": [
        this.applicant.representative.firstname,
        [
          Validators.required, 
          Validators.maxLength(50),
          Validators.pattern(regExpStr)
        ]
      ],
      "middlename": [
        this.applicant.representative.middlename,
        [
          Validators.required, 
          Validators.maxLength(50),
          Validators.pattern(regExpStr)
        ]
      ],
      "hasMiddlename": [
        this.applicant.hasMiddlename, 
        [
          Validators.required
        ]
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
      isChecked: [""],
      checkSum: ["", Validators.required],     
      relationType: ["", Validators.required],
      agree: ["", Validators.required]
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
}
