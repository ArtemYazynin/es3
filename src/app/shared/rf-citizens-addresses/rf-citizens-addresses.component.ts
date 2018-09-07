import { Component, OnInit, QueryList, ViewChildren, Input } from '@angular/core';
import { AddressComponent } from '../address/address.component';
import { addressTypes } from "../address-type";
import { MatCheckboxChange } from '@angular/material';
import { Address } from '../address';
import { ActivatedRoute } from '@angular/router';
import { CompilationOfWizardSteps, WizardStorageService, PersonWithAddress, Parent } from '..';
import { fromEvent } from 'rxjs';
import { Applicant } from '../applicant';

@Component({
  selector: 'app-rf-citizens-addresses',
  templateUrl: './rf-citizens-addresses.component.html',
  styleUrls: ['./rf-citizens-addresses.component.css']
})
export class RfCitizensAddressesComponent implements OnInit {
  @ViewChildren(AddressComponent) addressesComponents: QueryList<AddressComponent>;
  @Input() owner: Parent | Applicant;
  addressTypes = addressTypes;
  currentDate = new Date();
  temporaryRegistration:boolean = false;
  tempRegistrationExpiredDate: Date;
  registerAddressLikeAsResidentialAddress:boolean = false;
  inquiry: CompilationOfWizardSteps;
  private inquiryType = this.route.snapshot.data.resolved.inquiryType;
  private residentialAddressBackup: Address;

  constructor(private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.temporaryRegistration = !!this.owner.tempRegistrationExpired;
    this.tempRegistrationExpiredDate = this.owner.tempRegistrationExpired;
    this.registerAddressLikeAsResidentialAddress = this.owner.registerAddressLikeAsResidentialAddress;
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
        return this.clone(residentialAddress ? residentialAddress : this.owner.residential);
      })();
      this.addressesComponents.find(x => x.type == addressTypes.residential).address = (() => {
        const registerAddress = this.addressesComponents.find(x => x.type == addressTypes.register).address;
        return this.clone(registerAddress ? registerAddress : this.owner.register);

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
