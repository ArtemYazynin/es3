import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import {
  Applicant,
  IdentityCardType,
  IdentityCard
} from "../shared/index";

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.css']
})
export class WizardComponent implements OnInit {
  applicantForm: FormGroup;
  applicant: Applicant = new Applicant();
  identityCardTypeEnum = IdentityCardType;
  
  // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
  formErrors = {
    "lastname": "",
    "firstname": "",
    "middlename": "",
    "snils": "",
    "series": "",
    "number":"",
    "issued":"",
    "dateIssue":"",
    "dateExpired":"",
    "issueDepartmentCode":"",
    "actRecordNumber":"",
    "actRecordDate":"",
    "actRecordPlace":""
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
    "series":{
      "required": "Обязательное поле."
    },
    "number":{
      "required": "Обязательное поле."
    },

    "issued":{
      "required": "Обязательное поле."
    },
    "dateIssue":{
      "required": "Обязательное поле."
    },
    "dateExpired":{
      "required": "Обязательное поле."
    },
    "issueDepartmentCode":{
      "required": "Обязательное поле.",
      "pattern": "Формат 000-000"
    },
    "actRecordNumber":{
      "required": "Обязательное поле.",
      "maxlength": "Максимальная длина 6 цифр.",
      "pattern": "Формат 6 цифр"
    },
    "actRecordDate":{
      "required": "Обязательное поле."
    },
    "actRecordPlace":{
      "required": "Обязательное поле."
    }
  };
  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.applicant.representative.IdentityCard.identityCardType = IdentityCardType["Паспорт РФ"];
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
      "identityCardType": [
        this.applicant.representative.IdentityCard.identityCardType, 
        [
          Validators.required
        ]
      ],
      "name": [
        this.applicant.representative.IdentityCard.name,
        [
          Validators.required,
          Validators.maxLength(400)
        ]
      ],
      "series": [
        this.applicant.representative.IdentityCard.series, 
        [
          Validators.required
        ]
      ],
      "number": [
        this.applicant.representative.IdentityCard.number, 
        [
          Validators.required
        ]
      ],
      "issued": [
        this.applicant.representative.IdentityCard.issued,
        [
          Validators.required,
          Validators.maxLength(400)
        ]
      ],
      "dateIssue": [
        this.applicant.representative.IdentityCard.dateIssue, 
        [
          Validators.required
        ]
      ],
      "dateExpired": [
        this.applicant.representative.IdentityCard.dateExpired, 
        [
          
        ]
      ],
      "issueDepartmentCode": [
        this.applicant.representative.IdentityCard.issueDepartmentCode, 
        [
          Validators.required,
          Validators.pattern("^\\d{3}-\\d{3}$")
        ]
      ],
      "actRecordNumber": [
        this.applicant.representative.IdentityCard.actRecordNumber, 
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern("^\\d{1,6}$")
        ]
      ],
      "actRecordDate": [
        this.applicant.representative.IdentityCard.actRecordDate, 
        [
          Validators.required
        ]
      ],
      "actRecordPlace": [
        this.applicant.representative.IdentityCard.actRecordPlace, 
        [
          Validators.required
        ]
      ],
      isChecked: [""],
      checkSum: ["", Validators.required],
      citizenship: ["", Validators.required],
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
