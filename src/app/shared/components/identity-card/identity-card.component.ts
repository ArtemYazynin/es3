import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Entity, FormService, IdentityCard, IdentityCardChangeHandler, IdentityCardService, IdentityCardType } from '../../index';

@Component({
  selector: 'identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IdentityCardComponent implements OnInit, OnDestroy {
  @Input()
  ids: Array<number> = [];

  private ngUnsubscribe: Subject<any> = new Subject();
  types: Array<Entity<number>> = [];
  mask = {
    issueDepartmentCodeMask: [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/],
    temporaryResidenceNumber: [/\d/, /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, /\d/]
  };
  currentDate = new Date();
  identityCardForm: FormGroup;

  formErrors = IdentityCard.getFormErrorsTemplate();
  validationMessages = IdentityCard.getValidationMessages();
  isAvailable = (() => {
    let fields = IdentityCard.getFields();
    let result = (() => {
      let localResult = {};
      fields.forEach(function (field) {
        localResult[field] = false;
      });
      return localResult;
    })();
    result["reset"] = () => {
      for (const key in result) {
        if (result.hasOwnProperty(key) && (typeof result[key]) !== "function") {
          result[key] = false;
        }
      }
    }
    return result;
  })();
  constructor(private fb: FormBuilder, private formService: FormService, private identityCardService: IdentityCardService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.identityCardService.getTypes(this.ids)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.types = result;
        this.identityCardForm.patchValue({ identityCardType: IdentityCardType["Паспорт РФ"] });
      });
    this.buildForm();
    this.subscribeToIdentityCardType();
  }
  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  private buildForm() {
    this.identityCardForm = this.fb.group({
      "identityCardType": ["", []],
      "name": ["", []],
      "series": ["", []],
      "number": ["", []],
      "issued": ["", []],
      "dateIssue": ["", []],
      "dateExpired": ["", []],
      "issueDepartmentCode": ["", []],
      "actRecordNumber": ["", []],
      "actRecordDate": ["", []],
      "actRecordPlace": ["", []],
    });
    this.identityCardForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.formService.onValueChange(this.identityCardForm, this.formErrors, this.validationMessages);
      });
  }
  subscribeToIdentityCardType(): void {
    let changeHandler = new IdentityCardChangeHandler(this.identityCardForm, this.isAvailable, this.validationMessages);
    this.identityCardForm.get("identityCardType")
      .valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(type => {
        changeHandler.Do(parseInt(type));
      });
  }
}
