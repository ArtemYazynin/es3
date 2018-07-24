import { Component, OnInit, OnDestroy, ViewChild, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { WizardStorageService, FormService, inquiryType, PrivilegeOrder, PrivilegeOrderService, Privilege, PrivilegeService, CommonService, AttachmentType, Child, ConfirmationDocument, StepBase } from '../../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';

@Component({
  selector: 'app-privilege-step',
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css']
})
export class PrivilegeStepComponent implements OnInit, OnDestroy, StepBase {
  @ViewChild(ConfirmationDocumentComponent) confirmationProofDocumentComponent: ConfirmationDocumentComponent;

  inquiryType: string;
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
    let check = (): boolean => {
      return this.privilegeForm.controls.privilegeOrder.value
        && this.privilegeForm.controls.privilege.value
        && this.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
    }
    return this.privilegeForm.controls.withoutPrivilege.value
      ? true
      : check();
  }
  attachmentTypes = AttachmentType;
  isVisible = (() => {
    let privilegeOrder = () => {
      return this.privilegeForm
        && !this.privilegeForm.controls.withoutPrivilege.value;
    }
    let privilege = () => {
      return privilegeOrder() && this.privilegeForm.controls.privilegeOrder.value
    }
    let privilegeProofDocument = () => {
      return privilege() && this.privilegeForm.controls.privilege.value;
    }
    return {
      privilegeOrder: privilegeOrder,
      privilege: privilege,
      privilegeProofDocument: privilegeProofDocument
    }
  })();
  public displayFn = this.commonService.displayFn;
  private subscribeOnwithoutPrivilege() {
    this.withoutPrivilegeSubscription = this.privilegeForm.get("withoutPrivilege").valueChanges.subscribe(checked => {
      this.privilegeForm.controls.privilegeOrder.clearValidators();
      this.privilegeForm.controls.privilegeOrder.patchValue("");

      this.privilegeForm.controls.privilege.clearValidators();
      this.privilegeForm.controls.privilege.patchValue("");
      if (!checked) {
        this.privilegeForm.controls.privilegeOrder.setValidators([Validators.required]);
      }
      this.privilegeForm.controls.privilegeOrder.updateValueAndValidity();
      this.privilegeForm.controls.privilege.updateValueAndValidity();
    });
  }
  private subscribeOnPrivilegeOrder() {
    this.privilegeOrderSubscription = this.privilegeForm.get("privilegeOrder").valueChanges.subscribe(val => {
      this.privilegeService.get(val).subscribe(result => {
        this.privileges = result;
        this.privilegeForm.controls.privilege.patchValue("");
        this.filteredPrivileges = this.privilegeForm.controls.privilege.valueChanges.pipe(
          startWith<string | Privilege>(''),
          map((value: Privilege) => typeof value === 'string' ? value : value.name),
          map((name: string) => {
            return name ? this.commonService.autoCompliteFilter(this.privileges, name) : this.privileges.slice();
          })
        );
        this.privilegeForm.controls.privilege.clearValidators();
        if (!this.privilegeForm.controls.withoutPrivilege.value) {
          this.privilegeForm.controls.privilege.setValidators([Validators.required]);
        }
        this.privilegeForm.controls.privilege.updateValueAndValidity();
      });

    });
  }

  goTo = {
    back: () => {
      if (this.inquiryType == inquiryType.healthCamp) {
        this.router.navigate(["../jobInfoStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
      }
    },
    next: () => {
      (() => {
        const privilege = new Privilege(this.privilegeForm.controls.privilege.value.id, this.privilegeForm.controls.privilege.value.name, this.privilegeForm.controls.privilegeOrder.value);
        privilege.privilegeProofDocument = this.commonService.getDocumentByType([this.confirmationProofDocumentComponent], AttachmentType.PrivilegeProofDocument);
        this.storageService.update(this.inquiryType, { privilege: privilege });
      })();

      switch (this.inquiryType) {
        case inquiryType.profEducation:
          this.router.navigate(["../educDocumentInfoStep"], { relativeTo: this.activatedRoute });
          break;
        case inquiryType.preschool:
          this.router.navigate(["../inquiryInfoStep"], { relativeTo: this.activatedRoute });
          break;
        case inquiryType.school:
          this.router.navigate(["../schoolInquiryInfoStep"], { relativeTo: this.activatedRoute });
          break;
        default:
          break;
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
