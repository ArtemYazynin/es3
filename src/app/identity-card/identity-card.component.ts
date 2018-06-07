import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { IdentityCard, IdentityCardType } from '../shared';

@Component({
  selector: 'identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.css']
})
export class IdentityCardComponent implements OnInit {
  identityCardForm: FormGroup;
  identityCard: IdentityCard = new IdentityCard();
  identityCardTypeEnum = IdentityCardType;
  // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
  formErrors = {
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
  validationMessages = {
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
    this.identityCard.identityCardType = IdentityCardType["Паспорт РФ"];
    this.buildForm();
  }

  private buildForm() {
    this.identityCardForm = this.fb.group({
      "identityCardType": [
        this.identityCard.identityCardType, 
        [
          Validators.required
        ]
      ],
      "name": [
        this.identityCard.name,
        [
          Validators.required,
          Validators.maxLength(400)
        ]
      ],
      "series": [
        this.identityCard.series, 
        [
          Validators.required
        ]
      ],
      "number": [
        this.identityCard.number, 
        [
          Validators.required
        ]
      ],
      "issued": [
        this.identityCard.issued,
        [
          Validators.required,
          Validators.maxLength(400)
        ]
      ],
      "dateIssue": [
        this.identityCard.dateIssue, 
        [
          Validators.required
        ]
      ],
      "dateExpired": [
        this.identityCard.dateExpired, 
        [
          
        ]
      ],
      "issueDepartmentCode": [
        this.identityCard.issueDepartmentCode, 
        [
          Validators.required,
          Validators.pattern("^\\d{3}-\\d{3}$")
        ]
      ],
      "actRecordNumber": [
        this.identityCard.actRecordNumber, 
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.pattern("^\\d{1,6}$")
        ]
      ],
      "actRecordDate": [
        this.identityCard.actRecordDate, 
        [
          Validators.required
        ]
      ],
      "actRecordPlace": [
        this.identityCard.actRecordPlace, 
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
    this.identityCardForm.valueChanges
            .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    if (!this.identityCardForm) return;
    let form = this.identityCardForm;
    
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
