import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { AttachmentType, CommonService, CompilationOfWizardSteps, FormService, inquiryType, Privilege, PrivilegeOrder, PrivilegeOrderService, PrivilegeService, StepBase, WizardStorageService } from '../../shared';

@Component({
  selector: 'app-privilege-step',
  templateUrl: './privilege-step.component.html',
  styleUrls: ['./privilege-step.component.css']
})
export class PrivilegeStepComponent implements OnInit, DoCheck, AfterViewInit, OnDestroy, StepBase {
  @ViewChild(ConfirmationDocumentComponent) confirmationProofDocumentComponent: ConfirmationDocumentComponent;

  private ngUnsubscribe: Subject<any> = new Subject();
  private privileges: Array<Privilege>
  private initializer: { privilege: () => void, document: () => void };
  showPrivilege: boolean;
  showPrivilegeOrders: boolean;
  showPrivilegeProofDocument: boolean;
  displayFn = this.commonService.displayFn;
  inquiryType: string;
  privilegeForm: FormGroup;
  privilegeOrders: Array<PrivilegeOrder> = []
  filteredPrivileges: Observable<Array<Privilege>>;
  attachmentTypes = AttachmentType;
  formErrors = this.route.snapshot.data.resolved.formErrors;
  validationMessages = this.route.snapshot.data.resolved.validationMessages;

  constructor(private storageService: WizardStorageService, private formService: FormService, private fb: FormBuilder,
    private router: Router, private activatedRoute: ActivatedRoute, private privilegeOrderService: PrivilegeOrderService,
    private privilegeService: PrivilegeService, private commonService: CommonService, private cdr: ChangeDetectorRef,
    private route: ActivatedRoute) {
  }

  ngDoCheck(): void {
    this.showPrivilegeOrders = this.needPrivilege();
    this.showPrivilege = this.needPrivilege() && !!this.privilegeForm.controls.privilegeOrder.value;
    this.showPrivilegeProofDocument = this.showPrivilege && !!this.privilegeForm.controls.privilege.value;
  }
  ngAfterViewInit(): void {
    this.initializer.document();
  }

  ngOnInit() {
    this.inquiryType = this.route.snapshot.data.resolved.inquiryType;
    this.buildForm();
    this.subscribeOnwithoutPrivilege();
    this.subscribeOnPrivilegeOrder();
    this.privilegeOrderService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.privilegeOrders = result;
      });
    this.initializer = this.getInitializer();
    this.initializer.privilege();

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

  private getInitializer = () => {
    const inquiry = <CompilationOfWizardSteps>this.storageService.get(this.inquiryType);
    return {
      privilege: () => {
        if (!inquiry.privilege) return;
        if (Object.keys(inquiry.privilege).length == 0) {
          this.privilegeForm.patchValue({ withoutPrivilege: true });
        } else if (inquiry.privilege) {
          this.privilegeForm.patchValue({
            withoutPrivilege: false,
            privilegeOrder: inquiry.privilege.privilegeOrderId,
            privilege: inquiry.privilege
          });
        }
      },
      document: () => {
        if (inquiry && inquiry.privilege && inquiry.privilege.privilegeProofDocument) {
          this.confirmationProofDocumentComponent.confirmationDocumentForm.patchValue(inquiry.privilege.privilegeProofDocument);
          this.cdr.detectChanges();
        }
      }
    }

  }

  private needPrivilege() {
    return this.privilegeForm && !this.privilegeForm.controls.withoutPrivilege.value;
  }
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
        this.reset.privilege(this.privilegeForm.controls.withoutPrivilege.value);
        if (isNullOrUndefined(val) || val == "") return;
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
        let privilege: Privilege;
        if (this.privilegeForm.controls.withoutPrivilege.value) {
          privilege = new Privilege(undefined, undefined, undefined);
        } else {
          privilege = new Privilege(this.privilegeForm.controls.privilege.value.id, this.privilegeForm.controls.privilege.value.name, this.privilegeForm.controls.privilegeOrder.value);
          privilege.privilegeProofDocument = this.commonService.getDocumentByType([this.confirmationProofDocumentComponent], AttachmentType.PrivilegeProofDocument);
        }
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

  private buildForm() {
    this.privilegeForm = this.route.snapshot.data.resolved.form;
    this.privilegeForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
      .subscribe(() => this.formService.onValueChange(this.privilegeForm, this.formErrors, this.validationMessages, false));
    this.formService.onValueChange(this.privilegeForm, this.formErrors, this.validationMessages, false);
  }
}
