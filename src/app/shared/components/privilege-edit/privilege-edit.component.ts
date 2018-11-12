import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AttachmentType, CommonService, FormService, InquiryRequest, Privilege, PrivilegeOrder, PrivilegeOrderService, PrivilegeService } from '../..';
import { EditConfirmationDocumentComponent } from '../edit-confirmation-document/edit-confirmation-document.component';

@Component({
  selector: 'app-privilege-edit',
  templateUrl: './privilege-edit.component.html',
  styleUrls: ['./privilege-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrivilegeEditComponent implements OnInit, AfterViewInit {
  @Input() privilege: Privilege;
  @ViewChild(EditConfirmationDocumentComponent) confirmationProofDocumentComponent: EditConfirmationDocumentComponent;

  private ngUnsubscribe: Subject<any> = new Subject();
  private privileges: Array<Privilege>;
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
  };
  compareObjects = this.commonService.compareObjects;
  displayFn = this.commonService.displayFn;
  attachmentTypes = AttachmentType;
  privilegeForm: FormGroup;
  privilegeOrders: Observable<Array<PrivilegeOrder>>;
  filteredPrivileges: Observable<Array<Privilege>>;
  constructor(private formService: FormService, private fb: FormBuilder, private privilegeOrderService: PrivilegeOrderService,
    private privilegeService: PrivilegeService, private commonService: CommonService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeOnwithoutPrivilege();
    this.subscribeOnPrivilegeOrder();
    this.privilegeOrders = this.privilegeOrderService.get();

    if (!this.privilege) {
      this.privilegeForm.patchValue({ withoutPrivilege: true });
    } else {
      this.privilegeForm.patchValue({
        privilegeOrder: this.privilege.privilegeOrder,
        privilege: this.privilege
      });
    }
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  ngAfterViewInit(): void {
    if (this.privilege && this.privilege.privilegeProofDocument
      && this.confirmationProofDocumentComponent && this.confirmationProofDocumentComponent.confirmationDocumentForm) {
      this.confirmationProofDocumentComponent.confirmationDocumentForm.patchValue(this.privilege.privilegeProofDocument);
      this.cdr.detectChanges();
    }
  }

  isValid = (): boolean => {
    let isValid = this.privilegeForm.controls.withoutPrivilege.value
      ? true
      : !!this.privilegeForm.controls.privilegeOrder.value
      && !!this.privilegeForm.controls.privilege.value
      && !!this.confirmationProofDocumentComponent
      && !!this.confirmationProofDocumentComponent.confirmationDocumentForm.valid;
    return isValid;
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
        this.privilegeService.get()
          .pipe(takeUntil(this.ngUnsubscribe), distinctUntilChanged())
          .subscribe(result => {
            this.privileges = result.filter(value => value.privilegeOrder.id == val.id);
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
}
