import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Specificity, FormService, SpecificityService } from '../..';

@Component({
  selector: 'app-distribution-params',
  templateUrl: './distribution-params.component.html',
  styleUrls: ['./distribution-params.component.css']
})
export class DistributionParamsComponent implements OnInit {
  inquiryInfoForm: FormGroup;
  groupOfSpecificity: Array<Specificity> = [];
  formErrors = {
    wishDate: "",
    specificity: "",
    offerGeneralGroup: "",
    offerCareGroup: "",
    isSearchNear: "",
    isCanTempEnrolled: "",
  };
  validationMessages = {
    wishDate: { "required": "Обязательное поле." },
  }
  wishDates = (() => {
    let result = [];
    let currentYear = new Date().getFullYear();
    for (let index = currentYear; index < currentYear + 5; index++) {
      result.push(index);
    }
    return result;
  })();
  constructor(private formService: FormService, private fb: FormBuilder,
    private specificityService: SpecificityService) { }

  ngOnInit() {
    this.buildForm();
    this.specificityService.get().subscribe(result => {
      this.groupOfSpecificity = result;
    });
  }
  private buildForm() {
    this.inquiryInfoForm = this.fb.group({
      "wishDate": [
        "",
        [Validators.required]
      ],
      "specificity": [
        "",
        []
      ],
      "offerGeneralGroup": [
        false,
        []
      ],
      "offerCareGroup": [
        false,
        []
      ],
      "isSearchNear": [
        false,
        []
      ],
      "isCanTempEnrolled": [
        false,
        []
      ],
    })
    this.inquiryInfoForm.valueChanges.subscribe(() => this.formService.onValueChange(this.inquiryInfoForm, this.formErrors, this.validationMessages, false));
    this.formService.onValueChange(this.inquiryInfoForm, this.formErrors, this.validationMessages, false);
  }
}
