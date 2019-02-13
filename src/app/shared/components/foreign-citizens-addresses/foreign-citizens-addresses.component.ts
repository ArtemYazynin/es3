import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { Address, addressTypes, Applicant, CommonService, FormService, inquiryType, Parent, PersonWithAddress, Theme } from '../../index';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-foreign-citizens-addresses',
  templateUrl: './foreign-citizens-addresses.component.html',
  styleUrls: ['./foreign-citizens-addresses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'host' }
})
export class ForeignCitizensAddressesComponent implements OnInit, OnDestroy {
  @ViewChild(AddressComponent) addressComponent: AddressComponent;
  @Input() owner: Parent | Applicant;

  private subscription: Subscription;

  addressTypes = addressTypes;
  inquiryTypes = inquiryType;
  form: FormGroup;
  foreignAddress: string;
  currentDate = new Date();
  themes = Theme;

  formErrors = {
    "foreignAddress": "",
    "tempRegistrationExpiredDate": "",
  }
  validationMessages = {
    "foreignAddress": {
      "required": "Обязательное поле.",
      "maxlength": "Максимальная длина 1000 символов.",
    },
    "tempRegistrationExpiredDate": {
      "required": "Обязательное поле."
    }
  }

  constructor(private fb: FormBuilder, private formService: FormService, private commonService: CommonService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.buildForm();
    if (!this.owner || !this.owner.register || this.owner.citizenships.includes(643)) return;
    let value = (() => {
      if (this.owner.register.foreign) {
        this.setRequiredForeignAddress();
        return { notHasRfRegistration: this.owner.register.foreign, foreignAddress: this.owner.register.additionalInfo };
      } else {
        this.setRequiredTempRegistrationExpiredDate();
        return { notHasRfRegistration: this.owner.register.foreign, tempRegistrationExpiredDate: this.owner.tempRegistrationExpiredDate };
      }
    })();
    this.form.patchValue(value);
  }

  getResult(): PersonWithAddress {
    let result: any = { residential: undefined };

    if (this.form.controls.notHasRfRegistration.value) {
      const additionalInfo = this.form.controls.foreignAddress.value;
      if (additionalInfo) result.register = Address.build({ additionalInfo: additionalInfo }, true)
    } else {
      result.register = this.commonService.getAddressFromComponents(this.addressComponent);
      if (result.register) {
        result.tempRegistrationExpiredDate = this.form.controls.tempRegistrationExpiredDate.value;
      } else {
        delete result.tempRegistrationExpiredDate;
      }

    }
    return result;
  }

  hasRegistrationChange(change: MatCheckboxChange) {
    if (this.addressComponent) this.addressComponent.$address.next(undefined);
    if (change.checked) {
      this.setUnRequiredTempRegistrationExpiredDate();
      this.setRequiredForeignAddress();
    } else {
      this.setUnRequiredForeignAddress();
      this.setRequiredTempRegistrationExpiredDate();
    }
  }

  private setRequiredForeignAddress() {
    this.form.controls.foreignAddress.setValidators([Validators.required]);
    this.form.controls.foreignAddress.updateValueAndValidity();
  }

  private setUnRequiredForeignAddress() {
    this.form.controls.foreignAddress.clearValidators();
    this.form.controls.foreignAddress.updateValueAndValidity();
  }

  private setRequiredTempRegistrationExpiredDate() {
    this.form.controls.tempRegistrationExpiredDate.setValidators([Validators.required]);
    this.form.controls.tempRegistrationExpiredDate.updateValueAndValidity();
  }

  private setUnRequiredTempRegistrationExpiredDate() {
    this.form.controls.tempRegistrationExpiredDate.clearValidators();
    this.form.controls.tempRegistrationExpiredDate.updateValueAndValidity();
  }

  private buildForm() {
    this.form = this.fb.group({
      notHasRfRegistration: [
        false,
        []
      ],
      foreignAddress: [
        "",
        []
      ],
      tempRegistrationExpiredDate: [
        "",
        []
      ]
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  private onValueChange(data?: any) {
    this.formService.onValueChange(this.form, this.formErrors, this.validationMessages);
  }
}
