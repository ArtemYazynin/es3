import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { IdentityCard, IdentityCardType, FormService } from '../../shared/index';

@Component({
  selector: 'identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.css']
})
export class IdentityCardComponent implements OnInit {
  identityCardForm: FormGroup;
  identityCard: IdentityCard = new IdentityCard();
  identityCardTypeEnum = IdentityCardType;

  formErrors = IdentityCard.getFormErrorsTemplate();
  validationMessages = IdentityCard.getValidationMessages();
  
  constructor(private fb: FormBuilder, private formService: FormService) {  }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.identityCardForm = this.fb.group({
      "identityCardType": [
        IdentityCardType["Паспорт РФ"], 
        [ Validators.required ]
      ],
      "name": [
        "некий другой документ",
        [
          Validators.required,
          Validators.maxLength(400)
        ]
      ],
      "series": [
        "1234", 
        [
          Validators.required
        ]
      ],
      "number": [
        "123456", 
        [
          Validators.required
        ]
      ],
      "issued": [
        "dvdvd",
        [
          Validators.required,
          Validators.maxLength(400)
        ]
      ],
      "dateIssue": [
        new Date(), 
        [
          Validators.required
        ]
      ],
      "dateExpired": [
        new Date(), 
        [ ]
      ],
      "issueDepartmentCode": [
        "000-000", 
        [
          Validators.required,
          Validators.pattern("^\\d{3}-\\d{3}$")
        ]
      ],
      "actRecordNumber": [
        "222222", 
        [
          Validators.required,
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.pattern("^\\d{1,6}$")
        ]
      ],
      "actRecordDate": [
        new Date(), 
        [
          Validators.required
        ]
      ],
      "actRecordPlace": [
        "ddvdv", 
        [
          Validators.required
        ]
      ],
    });
    this.identityCardForm.valueChanges
            .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    this.formService.onValueChange(this.identityCardForm, this.formErrors, this.validationMessages);
  }
}
