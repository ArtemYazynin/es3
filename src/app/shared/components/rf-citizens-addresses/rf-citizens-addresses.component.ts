import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, QueryList, ViewChildren, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Address, addressTypes, Applicant, Child, CitizenshipService, Parent, PersonWithAddress, CommonService, FormService, Theme } from '../../index';
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
  form: FormGroup;
  registerAddress: Address;
  residentialAddress: Address;
  themes = Theme;

  constructor(private citizenshipService: CitizenshipService, private fb: FormBuilder, private cdr: ChangeDetectorRef, private commonService: CommonService,
    private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
    this.form.controls.registerAddressLikeAsResidentialAddress.setValue(this.owner && this.owner.registerAddressLikeAsResidentialAddress);

    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(countries => {
        if (this.owner && this.owner.citizenships && this.citizenshipService.hasRfCitizenship(this.owner.citizenships, countries)) {
          this.form.controls.temporaryRegistration.setValue(!!this.owner.tempRegistrationExpiredDate);
          this.form.controls.tempRegistrationExpiredDate.setValue(this.owner.tempRegistrationExpiredDate);
          this.form.updateValueAndValidity();
        }
      });
    this.form.updateValueAndValidity();
  }

  ngAfterViewInit() {
    this.addressesComponents
      .find(comp => comp.type == addressTypes.register).$address
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(address => {
        if (!address) {
          this.registerAddress = undefined;
          this.form.patchValue({ temporaryRegistration: false, registerAddressLikeAsResidentialAddress: false});
          this.form.controls.temporaryRegistration.disable();
          this.form.controls.registerAddressLikeAsResidentialAddress.disable();

          this.temporaryRegistrationChange((()=>{
            let change = new MatCheckboxChange();
            change.checked = false;
            return change;
          })());
          
          //this.form.updateValueAndValidity();
        } else {
          this.registerAddress = address;
          this.form.controls.temporaryRegistration.enable();
          this.form.controls.registerAddressLikeAsResidentialAddress.enable();
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

    result.registerAddressLikeAsResidentialAddress = this.form.controls.registerAddressLikeAsResidentialAddress.value;
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

    result.tempRegistrationExpiredDate = this.form.controls.tempRegistrationExpiredDate.value;

    return result;
  }

  temporaryRegistrationChange = (change: MatCheckboxChange) => {
    if (change.checked) {
      this.formService.updateValidators(this.form, [new ControlInfo("tempRegistrationExpiredDate", [Validators.required])]);
    } else {
      this.form.controls.tempRegistrationExpiredDate.setValue(undefined);
      this.formService.updateValidators(this.form, [new ControlInfo("tempRegistrationExpiredDate", [])])
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
    let dateValidators = this.owner.tempRegistrationExpiredDate ? [Validators.required] : [];
    this.form = this.fb.group({
      "temporaryRegistration": [false, []],
      "tempRegistrationExpiredDate": [null, dateValidators],
      "registerAddressLikeAsResidentialAddress": [false, []]
    });
  }
}
