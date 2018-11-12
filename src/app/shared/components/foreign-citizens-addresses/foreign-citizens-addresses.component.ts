import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Address, addressTypes, Applicant, CitizenshipService, CommonService, Country, CountryService, FormService, inquiryType, Parent, PersonWithAddress } from '../../index';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-foreign-citizens-addresses',
  templateUrl: './foreign-citizens-addresses.component.html',
  styleUrls: ['./foreign-citizens-addresses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
  countries: Array<Country> = [];

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

  constructor(private fb: FormBuilder, private formService: FormService,
    private citizenshipService: CitizenshipService, private commonService: CommonService, private countryService: CountryService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.buildForm();
    this.subscription = this.countryService.gets()
      .subscribe(result => {
        this.countries = result;
        if (!this.owner || !this.owner.register || this.citizenshipService.hasRfCitizenship(this.owner.citizenships, this.countries)) return;

        let value = this.owner.register.foreign
          ? { notHasRfRegistration: this.owner.register.foreign, foreignAddress: this.owner.register.additionalInfo }
          : { notHasRfRegistration: this.owner.register.foreign, tempRegistrationExpiredDate: this.owner.tempRegistrationExpiredDate }
        this.form.patchValue(value);
      });
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

  hasRegistrationChange() {
    if (!this.addressComponent) return;
    this.addressComponent.$address.next(undefined);
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
