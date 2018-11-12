import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address, addressTypes, Applicant, Child, CitizenshipService, Parent, PersonWithAddress, CommonService, FormService, CountryService } from '../../index';
import { AddressComponent } from '../address/address.component';
import { ControlInfo } from '../../models/controlInfo.model';

@Component({
  selector: 'app-rf-citizens-addresses',
  templateUrl: './rf-citizens-addresses.component.html',
  styleUrls: ['./rf-citizens-addresses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfCitizensAddressesComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChildren(AddressComponent) addressesComponents: QueryList<AddressComponent>;
  @Input() owner: Parent | Applicant | Child;
  private ngUnsubscribe: Subject<any> = new Subject();
  addressTypes = addressTypes;
  currentDate = new Date();
  temporaryRegistration: boolean = false;
  tempRegistrationExpiredDate: Date;
  registerAddressLikeAsResidentialAddress: boolean = false;
  private residentialAddressBackup: Address;
  checkboxesForm: FormGroup;
  registerAddress: Address;
  residentialAddress: Address;

  constructor(private citizenshipService: CitizenshipService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private commonService: CommonService,
      private formService:FormService, private countryService:CountryService) { }

  ngOnInit() {
    this.buildForm();
    this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.setValue(this.owner && this.owner.registerAddressLikeAsResidentialAddress);

    this.countryService.gets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(countries => {
        if (this.owner && this.owner.citizenships && this.citizenshipService.hasRfCitizenship(this.owner.citizenships, countries)) {
          this.checkboxesForm.controls.temporaryRegistration.setValue(!!this.owner.tempRegistrationExpiredDate);
          this.checkboxesForm.controls.tempRegistrationExpiredDate.setValue(this.owner.tempRegistrationExpiredDate);
          this.checkboxesForm.updateValueAndValidity();
        }
      });
    this.checkboxesForm.updateValueAndValidity();
  }

  ngAfterViewInit() {
    this.addressesComponents
      .find(comp => comp.type == addressTypes.register).$address
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(address => {
        if (!address) {
          this.registerAddress = undefined;
          this.checkboxesForm.patchValue({ temporaryRegistration: false, registerAddressLikeAsResidentialAddress: false, tempRegistrationExpiredDate: undefined });
          this.checkboxesForm.controls.temporaryRegistration.disable();
          this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.disable();
          this.checkboxesForm.updateValueAndValidity();
        } else {
          this.registerAddress = address;
          this.checkboxesForm.controls.temporaryRegistration.enable();
          this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.enable();
        }
        setTimeout(() => {
          this.cdr.markForCheck();
        });

      });

    this.addressesComponents
      .find(comp => comp.type == addressTypes.residential).$address
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(address => {
        if (!address) {
          this.residentialAddress = undefined;
        }
        else {
          this.residentialAddress = address;
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getResult(): PersonWithAddress {
    let result: any = {};

    result.registerAddressLikeAsResidentialAddress = this.checkboxesForm.controls.registerAddressLikeAsResidentialAddress.value;
    this.addressesComponents.forEach(component => {
      switch (component.type) {
        case addressTypes.register:
          result.register = this.commonService.getAddressFromComponents(component);
          break;
        case addressTypes.residential:
          result.residential = result.registerAddressLikeAsResidentialAddress 
            ? result.register
            : this.commonService.getAddressFromComponents(component)
          break;
        default:
          break;
      }
    });

    result.tempRegistrationExpiredDate = this.checkboxesForm.controls.tempRegistrationExpiredDate.value;

    return result;
  }

  temporaryRegistrationChange = (change: MatCheckboxChange) => {
    if (!change.checked) {
      this.checkboxesForm.controls.tempRegistrationExpiredDate.setValue(undefined);
      this.formService.updateValidators(this.checkboxesForm, [new ControlInfo("tempRegistrationExpiredDate", [])])
    }else{
      this.formService.updateValidators(this.checkboxesForm, [new ControlInfo("tempRegistrationExpiredDate", [Validators.required])])
    }
  }

  singleAddress = (change: MatCheckboxChange) => {
    let component = this.addressesComponents.find(x => x.type == addressTypes.residential);
    if (change.checked) {
      this.residentialAddressBackup = (() => {
        return this.clone(this.residentialAddress
          ? this.residentialAddress
          : this.owner ? this.owner.residential : undefined);
      })();
      component.$address.next((() => {
        return this.clone(this.registerAddress
          ? this.registerAddress
          : this.owner ? this.owner.register : undefined);
      })());
      component.drawAddress();
      component.mode = component.modes.read;
      document.getElementById("residentialAddressContainer").classList.add("disabledDiv");
    } else {
      component.$address.next(this.clone(this.residentialAddressBackup));
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
