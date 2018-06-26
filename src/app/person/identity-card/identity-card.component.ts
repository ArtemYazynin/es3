import { IMyDpOptions } from 'mydatepicker';
import { IdentityCard, IdentityCardType, FormService, Entity, IdentityCardService, IdentityCardChangeHandler } from '../../shared/index';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'identity-card',
  templateUrl: './identity-card.component.html',
  styleUrls: ['./identity-card.component.css']
})
export class IdentityCardComponent implements OnInit {
  @Input()
  ids: Array<number> = [];

  private identityCardTypeSubscription: Subscription;
  types: Array<Entity<number>> = [];
  mask = { issueDepartmentCodeMask: [/\d/,/\d/,/\d/,"-",/\d/,/\d/,/\d/] };
  myDatePickerOptions = (() => {
    let def = {
      dateFormat: 'dd.mm.yyyy',
      editableDateField: false,
      openSelectorOnInputClick: true
    }
    let currentDate = new Date();
    let _dateIssue: IMyDpOptions = {
      disableSince: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate() + 1,
      }
    }
    let _dateExpired: IMyDpOptions = {
      disableUntil: {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth() + 1,
        day: currentDate.getDate() - 1,
      }
    }
    return {
      dateIssue: Object.assign({}, def, _dateIssue),
      dateExpired: Object.assign({}, def, _dateExpired)
    }
  })();
  identityCardForm: FormGroup;
  identityCard: IdentityCard = new IdentityCard();

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
  constructor(private fb: FormBuilder, private formService: FormService, private identityCardService: IdentityCardService) { }

  ngOnInit() {
    this.identityCardService.getTypes(this.ids).subscribe(result => {
      this.types = result;
    });
    this.buildForm();
    this.subscribeToIdentityCardType();
    this.identityCardForm.patchValue({ identityCardType: IdentityCardType["Паспорт РФ"] });
  }
  ngOnDestroy() {
    this.identityCardTypeSubscription.unsubscribe();
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
      .subscribe(data => {
        this.formService.onValueChange(this.identityCardForm, this.formErrors, this.validationMessages);
      });
  }
  subscribeToIdentityCardType(): void {
    let changeHandler = new IdentityCardChangeHandler(this.identityCardForm, this.isAvailable, this.validationMessages);
    this.identityCardTypeSubscription = this.identityCardForm.get("identityCardType")
      .valueChanges
      .subscribe(type => {
        changeHandler.Do(parseInt(type));
      });
  }
}
