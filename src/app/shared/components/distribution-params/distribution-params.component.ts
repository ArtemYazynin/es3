import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormService, Specificity, SpecificityService } from '../..';
import { DistributionParams } from '../../models/distribution-params.model';

@Component({
  selector: 'app-distribution-params',
  templateUrl: './distribution-params.component.html',
  styleUrls: ['./distribution-params.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DistributionParamsComponent implements OnInit, OnDestroy {
  @Input() model: DistributionParams;

  private ngUnsubscribe: Subject<any> = new Subject();
  inquiryInfoForm: FormGroup;
  groupOfSpecificity: Array<Specificity>;
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
    let currentDate = new Date();
    let currentYear = currentDate.getMonth() < 8 ? currentDate.getFullYear() : currentDate.getFullYear() + 1;
    for (let index = currentYear, length = currentYear + 5; index < length; index++) {
      result.push(index);
    }
    return result;
  })();
  constructor(private formService: FormService, private fb: FormBuilder, private cdr: ChangeDetectorRef,
    private specificityService: SpecificityService) { }

  ngOnInit() {
    this.buildForm();
    this.specificityService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.groupOfSpecificity = data;

        if (this.model) {
          this.inquiryInfoForm.patchValue({
            wishDate: this.model.wishDate,
            offerGeneralGroup: this.model.offerGeneralGroup,
            offerCareGroup: this.model.offerCareGroup,
            isSearchNear: this.model.isSearchNear,
            isCanTempEnrolled: this.model.isCanTempEnrolled
          });
          if (this.model.specificity) {
            this.inquiryInfoForm.controls.specificity.patchValue(this.groupOfSpecificity.find(x => x.id == this.model.specificity.id));
          }
        }
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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
