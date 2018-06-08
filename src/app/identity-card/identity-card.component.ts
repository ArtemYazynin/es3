import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from "@angular/forms";
import { IdentityCard, IdentityCardType } from '../shared';
import { FormService } from '../shared/form.service';

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
    this.identityCard.actRecordDate = new Date();
    this.identityCard.actRecordNumber = "222222";
    this.identityCard.actRecordPlace = "ddvdv";
    this.identityCard.dateExpired = new Date();
    this.identityCard.dateIssue = new Date();
    this.identityCard.issued = "dvdvd";
    this.identityCard.issueDepartmentCode ="000-000";
    this.identityCard.name = "vdvdvdv";
    this.identityCard.number = "dvdvdvdv";
    this.identityCard.series = "ascascsac";

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
          Validators.minLength(6),
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
    });
    this.identityCardForm.valueChanges
            .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  onValueChange(data?: any) {
    this.formService.onValueChange(this.identityCardForm, this.formErrors, this.validationMessages);
  }
}
