import { AfterViewInit, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { Address, addressTypes, Applicant, Child, CitizenshipService, Parent, PersonWithAddress } from '../../index';
import { AddressComponent } from '../address/address.component';

@Component({
  selector: 'app-rf-citizens-addresses',
  templateUrl: './rf-citizens-addresses.component.html',
  styleUrls: ['./rf-citizens-addresses.component.css']
})
export class RfCitizensAddressesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(AddressComponent) addressesComponents: QueryList<AddressComponent>;
  @Input() owner: Parent | Applicant | Child;
  private subscriptionCountries: Subscription;
  private subscriptionRegisterAddress: Subscription;
  addressTypes = addressTypes;
  currentDate = new Date();
  temporaryRegistration: boolean = false;
  registerAddressLikeAsResidentialAddress: boolean = false;
  private residentialAddressBackup: Address;
  checkboxesForm: FormGroup;

  constructor(private citizenshipService: CitizenshipService, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
    this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.setValue(this.owner && this.owner.registerAddressLikeAsResidentialAddress);

    this.subscriptionCountries = this.citizenshipService.getCountries().subscribe(countries => {
      if (this.owner && this.owner.citizenships && this.citizenshipService.hasRfCitizenship(this.owner.citizenships, countries)) {
        this.checkboxesForm.controls.temporaryRegistration.setValue(!!this.owner.tempRegistrationExpiredDate);
        this.checkboxesForm.controls.tempRegistrationExpiredDate.setValue(this.owner.tempRegistrationExpiredDate);
        this.checkboxesForm.updateValueAndValidity();
      }
    });
    this.checkboxesForm.updateValueAndValidity();
  }

  ngAfterViewInit() {
    this.subscriptionRegisterAddress = this.addressesComponents
      .find(comp => comp.type == addressTypes.register).$address
      .subscribe(address => {
        if (!address) {
          this.checkboxesForm.patchValue({ temporaryRegistration: false, registerAddressLikeAsResidentialAddress: false, tempRegistrationExpiredDate: undefined });
          this.checkboxesForm.controls.temporaryRegistration.disable();
          this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.disable();
          this.checkboxesForm.updateValueAndValidity();
        } else {
          this.checkboxesForm.controls.temporaryRegistration.enable();
          this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.enable();
          this.checkboxesForm.updateValueAndValidity();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subscriptionCountries) this.subscriptionCountries.unsubscribe();
    if (this.subscriptionRegisterAddress) this.subscriptionRegisterAddress.unsubscribe();
  }

  getResult(): PersonWithAddress {
    let result: any = {};

    const registerAddress = this.addressesComponents.find(x => x.type == addressTypes.register).$address.getValue();
    result.register = registerAddress;

    const residentialAddress = this.addressesComponents.find(x => x.type == addressTypes.residential).$address.getValue();
    result.residential = residentialAddress.region ? residentialAddress : undefined;

    result.tempRegistrationExpiredDate = this.checkboxesForm.controls.tempRegistrationExpiredDate.value;
    result.registerAddressLikeAsResidentialAddress = this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.value;
    return result;
  }

  temporaryRegistrationChange = (change: MatCheckboxChange) => {
    if (!change.checked) {
      this.checkboxesForm.controls.tempRegistrationExpiredDate.setValue(undefined);
      this.checkboxesForm.updateValueAndValidity();
    }
  }

  singleAddress = (change: MatCheckboxChange) => {
    if (change.checked) {
      this.residentialAddressBackup = (() => {
        const residentialAddress = this.addressesComponents.find(x => x.type == addressTypes.residential).$address.getValue();
        return this.clone(residentialAddress
          ? residentialAddress
          : this.owner ? this.owner.residential : undefined);
      })();
      this.addressesComponents.find(x => x.type == addressTypes.residential).$address.next((() => {
        const registerAddress = this.addressesComponents.find(x => x.type == addressTypes.register).$address.getValue();
        return this.clone(registerAddress
          ? registerAddress
          : this.owner ? this.owner.register : undefined);
      })());
      document.getElementById("residentialAddressContainer").classList.add("disabledDiv");
    } else {
      this.addressesComponents.find(x => x.type == addressTypes.residential).$address.next(this.clone(this.residentialAddressBackup));
      delete this.residentialAddressBackup;
      document.getElementById("residentialAddressContainer").classList.remove("disabledDiv");
    }
  }

  private clone(obj: any) {
    return Object.assign({}, obj);
  }

  private buildForm() {
    this.checkboxesForm = this.fb.group({
      "temporaryRegistration": [false, []],
      "tempRegistrationExpiredDate": [null, []],
      "registerAddressLikeAsResidentialAddress": [false, []]
    });
  }
}