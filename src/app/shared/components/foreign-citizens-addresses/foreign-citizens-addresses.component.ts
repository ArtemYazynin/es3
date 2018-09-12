import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { AddressComponent } from '../address/address.component';
import { Parent, Applicant, addressTypes, inquiryType, Country, FormService, CitizenshipService, Child, PersonWithAddress, Address } from '../../index';

@Component({
  selector: 'app-foreign-citizens-addresses',
  templateUrl: './foreign-citizens-addresses.component.html',
  styleUrls: ['./foreign-citizens-addresses.component.css']
})
export class ForeignCitizensAddressesComponent implements OnInit, OnDestroy {
  @ViewChild(AddressComponent) addressComponent: AddressComponent;
  @Input() owner: Parent | Applicant;

  addressTypes = addressTypes;
  inquiryTypes = inquiryType;

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  private subscription: Subscription;
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

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private formService: FormService,
    private citizenshipService: CitizenshipService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  ngOnInit() {
    this.buildForm();
    this.subscription = this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
        if (!this.owner || !this.owner.register || this.citizenshipService.hasRfCitizenship(this.owner.citizenships, this.countries)) return;

        let value = this.owner.register.foreign
          ? { notHasRfRegistration: this.owner.register.foreign, foreignAddress: this.owner.register.additionalInfo }
          : { notHasRfRegistration: this.owner.register.foreign, tempRegistrationExpiredDate: this.owner.tempRegistrationExpiredDate }
        this.form.patchValue(value);
      });
  }
  getResult(owner: Parent | Applicant | Child): PersonWithAddress{
    let result: any = { residential:undefined };

    if (this.form.get("notHasRfRegistration").value) {
      const additionalInfo = this.form.get("foreignAddress").value;
      if (additionalInfo) result.register = Address.build({ additionalInfo: additionalInfo }, true)
    } else {
      result.register = this.addressComponent.address
        ? Address.build(this.addressComponent.address, false)
        : owner ? owner.register : undefined;
      result.tempRegistrationExpiredDate = this.form.controls.tempRegistrationExpiredDate.value;
    }
    return result;
  }
  hasRegistrationChange() {
    if (!this.addressComponent) return;
    delete this.addressComponent.address;
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
