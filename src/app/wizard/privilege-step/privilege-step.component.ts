import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { AttachmentType, CommonService, FormService, inquiryType, Privilege, PrivilegeOrder, PrivilegeOrderService, PrivilegeService, StepBase, WizardStorageService, CompilationOfWizardSteps } from '../../shared';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-privilege-step',
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css']
})
export class PrivilegeStepComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy, StepBase {
  private ngUnsubscribe: Subject<any> = new Subject();
  private inquiry: CompilationOfWizardSteps;
  private privileges: Array<Privilege>
  showPrivilege: boolean;
  showPrivilegeOrders: boolean;
  showPrivilegeProofDocument: boolean;
  displayFn = this.commonService.displayFn;
  private needPrivilege() {
    return this.privilegeForm && !this.privilegeForm.controls.withoutPrivilege.value;
  }

  ngDoCheck(): void {
    this.showPrivilegeOrders = this.needPrivilege();
    this.showPrivilege = this.needPrivilege() && !!this.privilegeForm.controls.privilegeOrder.value;
    this.showPrivilegeProofDocument = this.showPrivilege && !!this.privilegeForm.controls.privilege.value;
  }
  ngAfterViewInit(): void {
    if (this.inquiry && this.inquiry.privilege && this.inquiry.privilege.privilegeProofDocument) {
      this.confirmationProofDocumentComponent.confirmationDocumentForm.patchValue(this.inquiry.privilege.privilegeProofDocument);
      this.cdr.detectChanges();
    }
  }
  @ViewChild(ConfirmationDocumentComponent) confirmationProofDocumentComponent: ConfirmationDocumentComponent;
  inquiryType: string;
  privilegeForm: FormGroup;
  privilegeOrders: Array<PrivilegeOrder> = []
  filteredPrivileges: Observable<Array<Privilege>>;

  constructor(private storageService: WizardStorageService, private formService: FormService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute, private privilegeOrderService: PrivilegeOrderService,
    private privilegeService: PrivilegeService, private commonService: CommonService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
    this.buildForm();
    this.subscribeOnwithoutPrivilege();
    this.subscribeOnPrivilegeOrder();
    this.privilegeOrderService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.privilegeOrders = result;
      });

    // this.inquiry = <CompilationOfWizardSteps>this.storageService.get(this.inquiryType);
    // if (!this.inquiry.privilege) return;
    // if (this.inquiry.privilege) {
    //   this.privilegeForm.patchValue({
    //     withoutPrivilege: false,
    //     privilegeOrder: this.inquiry.privilege.privilegeOrderId,
    //     privilege: this.inquiry.privilege
    //   });
    // } else {
    //   this.privilegeForm.patchValue({ withoutPrivilege: true });
    // }
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  isValid() {
    let check = (): boolean => {
      return this.privilegeForm.controls.privilegeOrder.value
        && this.privilegeForm.controls.privilege.value
        && this.confirmationProofDocumentComponent
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
  private reset = (() => {
    const privilegeOrder = (withoutPrivilege?) => {
      this.privilegeForm.controls.privilegeOrder.clearValidators();
      this.privilegeForm.controls.privilegeOrder.patchValue("");
      if (!withoutPrivilege) this.privilegeForm.controls.privilegeOrder.setValidators([Validators.required]);
      this.privilegeForm.controls.privilegeOrder.updateValueAndValidity();
    }
    const privilege = (validate: boolean) => {
      this.privilegeForm.controls.privilege.clearValidators();
      this.privilegeForm.controls.privilege.patchValue("");
      if (validate) this.privilegeForm.controls.privilege.setValidators([Validators.required]);

      this.privilegeForm.controls.privilege.updateValueAndValidity();
    }
    return {
      privilegeOrder: privilegeOrder,
      privilege: privilege
    }
  })();
  private subscribeOnwithoutPrivilege() {
    this.privilegeForm.get("withoutPrivilege").valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
      .subscribe(checked => {
        this.reset.privilegeOrder(checked);
        this.reset.privilege(false);
      });
  }
  private subscribeOnPrivilegeOrder() {
    this.privilegeForm.get("privilegeOrder").valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
      .subscribe(val => {
        if (isNullOrUndefined(val) || val == "") {

        } else {
          this.privilegeService.get(val)
            .pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
            .subscribe(result => {
              this.privileges = result;
              this.filteredPrivileges = this.privilegeForm.controls.privilege.valueChanges.pipe(
                startWith<string | Privilege>(''),
                map((value: Privilege) => typeof value === 'string' ? value : value.name),
                map((name: string) => {
                  return name ? this.commonService.autoCompliteFilter(this.privileges, name) : this.privileges.slice();
                })
              );
              this.reset.privilege(this.privilegeForm.controls.withoutPrivilege.value);
            });
        }

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
        this.storageService.set(this.inquiryType, { privilege: privilege });
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
    this.privilegeForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
      .subscribe(() => this.formService.onValueChange(this.privilegeForm, this.formErrors, this.validationMessages, false));
    this.formService.onValueChange(this.privilegeForm, this.formErrors, this.validationMessages, false);
  }
}
