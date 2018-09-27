import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { DistributionParams } from '../../models/distribution-params';
import { Specificity, FormService, SpecificityService } from '../..';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-distribution-params',
  templateUrl: './distribution-params.component.html',
  styleUrls: ['./distribution-params.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributionParamsComponent implements OnInit, AfterViewInit {
  @Input() model: DistributionParams;

  inquiryInfoForm: FormGroup;
  $groupOfSpecificity: Observable<Array<Specificity>>;
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
    this.$groupOfSpecificity = this.specificityService.get();
  }
  ngAfterViewInit(): void {
    if(!this.model) return;
    this.inquiryInfoForm.patchValue({
      wishDate: this.model.wishDate,
      specificity: this.model.specificity,
      offerGeneralGroup: this.model.offerGeneralGroup,
      offerCareGroup: this.model.offerCareGroup,
      isSearchNear: this.model.isSearchNear,
      isCanTempEnrolled: this.model.isCanTempEnrolled
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
