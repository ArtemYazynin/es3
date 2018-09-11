import { Component, Input, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatCheckboxChange } from '@angular/material';
import { Subscription } from 'rxjs';
import { Parent, PersonWithAddress, Child } from '..';
import { Address } from '../address';
import { addressTypes } from "../address-type";
import { AddressComponent } from '../address/address.component';
import { Applicant } from '../applicant';
import { CitizenshipService } from '../citizenships/citizenship.service';

@Component({
  selector: 'app-rf-citizens-addresses',
  templateUrl: './rf-citizens-addresses.component.html',
  styleUrls: ['./rf-citizens-addresses.component.css']
})
export class RfCitizensAddressesComponent implements OnInit, OnDestroy {
  @ViewChildren(AddressComponent) addressesComponents: QueryList<AddressComponent>;
  @Input() owner: Parent | Applicant | Child;
  private subscription: Subscription;
  addressTypes = addressTypes;
  currentDate = new Date();
  temporaryRegistration: boolean = false;
  tempRegistrationExpiredDate: Date;
  registerAddressLikeAsResidentialAddress: boolean = false;
  private residentialAddressBackup: Address;

  constructor(private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.registerAddressLikeAsResidentialAddress = this.owner && this.owner.registerAddressLikeAsResidentialAddress;
    this.subscription = this.citizenshipService.getCountries().subscribe(countries => {
      if (this.owner && this.owner.citizenships && this.citizenshipService.hasRfCitizenship(this.owner.citizenships, countries)) {
        this.temporaryRegistration = !!this.owner.tempRegistrationExpiredDate;
        this.tempRegistrationExpiredDate = this.owner.tempRegistrationExpiredDate;
      }
    });
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  getResult(owner: Parent | Applicant | Child): PersonWithAddress {
    let result: any = {};

    const registerAddress = this.addressesComponents.find(x => x.type == addressTypes.register).address;
    result.register = registerAddress
      ? registerAddress
      : owner ? owner.register : undefined;

    const residentialAddress = this.addressesComponents.find(x => x.type == addressTypes.residential).address;
    result.residential = residentialAddress
      ? residentialAddress
      : owner ? owner.residential : undefined;

    result.tempRegistrationExpiredDate = this.tempRegistrationExpiredDate;
    result.registerAddressLikeAsResidentialAddress = this.registerAddressLikeAsResidentialAddress;
    return result;
  }

  temporaryRegistrationChange = (change: MatCheckboxChange) => {
    if (!change.checked) {
      this.tempRegistrationExpiredDate = undefined;
    }
  }

  singleAddress = (change: MatCheckboxChange) => {
    if (change.checked) {
      this.residentialAddressBackup = (() => {
        const residentialAddress = this.addressesComponents.find(x => x.type == addressTypes.residential).address;
        return this.clone(residentialAddress
          ? residentialAddress
          : this.owner ? this.owner.residential : undefined);
      })();
      this.addressesComponents.find(x => x.type == addressTypes.residential).address = (() => {
        const registerAddress = this.addressesComponents.find(x => x.type == addressTypes.register).address;
        return this.clone(registerAddress
          ? registerAddress
          : this.owner ? this.owner.register : undefined);

      })();
      document.getElementById("residentialAddressContainer").classList.add("disabledDiv");
    } else {
      this.addressesComponents.find(x => x.type == addressTypes.residential).address = this.clone(this.residentialAddressBackup);
      delete this.residentialAddressBackup;
      document.getElementById("residentialAddressContainer").classList.remove("disabledDiv");
    }
  }

  private clone(obj: any) {
    return Object.assign({}, obj);
  }
}
