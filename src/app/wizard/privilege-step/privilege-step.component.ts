import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WizardStorageService, FormService, inquiryType, PrivilegeOrder, PrivilegeOrderService, Privilege, PrivilegeService, CommonService } from '../../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCheckboxChange, MatSelectChange } from '@angular/material';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-privilege-step',
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css']
})
export class PrivilegeStepComponent implements OnInit, OnDestroy {

  private inquiryType: string;
  privilegeForm: FormGroup;

  privilegeOrders: Array<PrivilegeOrder> = []
  private privilegeOrderSubscription: Subscription;

  withoutPrivilegeSubscription: Subscription;

  private privileges: Array<Privilege>
  filteredPrivileges: Observable<Array<Privilege>>;


  constructor(private storageService: WizardStorageService, private formService: FormService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute, private privilegeOrderService: PrivilegeOrderService,
    private privilegeService: PrivilegeService, private commonService: CommonService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
    this.buildForm();
    this.subscribeOnwithoutPrivilege();
    this.subscribeOnPrivilegeOrder();
    this.privilegeOrderService.get().subscribe(result => {
      this.privilegeOrders = result;
    });
  }
  ngOnDestroy(): void {
    this.withoutPrivilegeSubscription.unsubscribe();
    this.privilegeOrderSubscription.unsubscribe();
  }
  isValid() {
    return false;
  }
  private subscribeOnwithoutPrivilege() {
    this.withoutPrivilegeSubscription = this.privilegeForm.get("withoutPrivilege").valueChanges.subscribe(checked => {
      let control = this.privilegeForm.get("privilegeOrder");
      control.clearValidators();
      if (!checked) {
        control.setValidators([Validators.required]);
      }
      control.updateValueAndValidity();
    });
  }
  private subscribeOnPrivilegeOrder() {
    this.privilegeOrderSubscription = this.privilegeForm.get("privilegeOrder").valueChanges.subscribe(val => {
      let s = val;
      this.privilegeService.get(val).subscribe(result => {
        this.privileges = result;
        let control = this.privilegeForm.get("privilege");
        this.filteredPrivileges = control.valueChanges.pipe(
          startWith<string | Privilege>(''),
          map((value: Privilege) => typeof value === 'string' ? value : value.name),
          map((name: string) => {
            return name ? this.commonService.autoCompliteFilter(this.privileges, name) : this.privileges.slice();
          })
        );
        control.clearValidators();
        control.setValidators([Validators.required]);
        control.updateValueAndValidity();
      });

    });
  }

  goTo = {
    back: () => {
      this.router.navigate(["../parentStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {
      if (this.inquiryType == inquiryType.healthCamp) {
        this.router.navigate(["../jobInfoStep"], { relativeTo: this.activatedRoute });
      } else {

      }
    }
  }
  formErrors = {
    withoutPrivilege: "",
    privilegeOrder: "",
    privilege: ""
  };
  validationMessages = {
    privilegeOrder: {
      "required": "Обязательное поле."
    },
    privilege: {
      "required": "Обязательное поле."
    }
    // phones: {
    //   "pattern": "Введите телефон(ы) через запятую в формате 10 цифр без пробелов и иных символов.",
    //   "maxlength": "Максимальная длина - 250 символов."
    // }
  }
  private buildForm() {
    this.privilegeForm = this.fb.group({
      "withoutPrivilege": [
        false,
        []
      ],
      "privilegeOrder": [
        "",
        [Validators.required]
      ],
      "privilege": [
        "",
        []
      ]
    })
    this.privilegeForm.valueChanges.subscribe(() => this.formService.onValueChange(this.privilegeForm, this.formErrors, this.validationMessages, false));
    this.formService.onValueChange(this.privilegeForm, this.formErrors, this.validationMessages, false);
  }
}
