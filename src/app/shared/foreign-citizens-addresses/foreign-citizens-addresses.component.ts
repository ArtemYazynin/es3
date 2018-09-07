import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { addressTypes } from "../../shared/address-type";
import { inquiryType, PersonWithAddress, WizardStorageService, FormService } from "../../shared/index";
import { CompilationOfWizardSteps } from '../../wizard/shared/compilation-of-wizard-steps';
import { AddressComponent } from '../address/address.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-foreign-citizens-addresses',
  templateUrl: './foreign-citizens-addresses.component.html',
  styleUrls: ['./foreign-citizens-addresses.component.css']
})
export class ForeignCitizensAddressesComponent implements OnInit {
  @ViewChildren(AddressComponent) addressesComponents: QueryList<AddressComponent>;
  @Input() owner: PersonWithAddress;

  addressTypes = addressTypes;
  inquiryTypes = inquiryType;

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  form:FormGroup;
  foreignAddress: string;
  currentDate = new Date();
  notHasRfRegistration: boolean = false;
  tempRegistrationExpiredDate: Date;

  inquiry: CompilationOfWizardSteps;

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

  constructor(private storageService: WizardStorageService, private route: ActivatedRoute, private fb:FormBuilder,private formService: FormService) { }

  ngOnInit() {
    this.inquiry = <CompilationOfWizardSteps>this.storageService.get(this.inquiryType);
    this.tempRegistrationExpiredDate = this.owner.tempRegistrationExpired;
    this.buildForm();
    this.form.controls.notHasRfRegistration.valueChanges.subscribe(checked=>{
      if (checked) {
        this.form.controls.foreignAddress.clearValidators();
        this.form.controls.foreignAddress.setValidators([Validators.required, Validators.maxLength(1000)]);
        this.form.controls.foreignAddress.updateValueAndValidity();

        this.form.controls.tempRegistrationExpiredDate.clearValidators();
        this.form.controls.tempRegistrationExpiredDate.updateValueAndValidity();
      }else{
        this.form.controls.foreignAddress.clearValidators();
        this.form.controls.foreignAddress.updateValueAndValidity();

        this.form.controls.tempRegistrationExpiredDate.clearValidators();
        this.form.controls.tempRegistrationExpiredDate.setValidators([Validators.required]);
        this.form.controls.tempRegistrationExpiredDate.updateValueAndValidity();
      }
    });
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
