import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { ConfirmationDocument, Person } from '.';
import { IdentityCard } from '../person/identity-card/shared/identityCard';

@Injectable()
export class FormService {

  constructor() { }
  onValueChange(form: FormGroup, formErrors: object, validationMessages: object, showIfDirtyOnly: boolean = true) {
    if (!form) return;
    let setMessage = (control: AbstractControl, field: string) => {
      let message = validationMessages[field];
      for (let key in control.errors) {
        formErrors[field] += message[key] + " ";
      }
    }
    for (let field in formErrors) {
      formErrors[field] = "";
      let control = form.get(field);
      if (showIfDirtyOnly) {
        if (control && control.dirty && !control.valid) {
          setMessage(control, field);
        }
      } else {
        if (control && !control.valid) {
          setMessage(control, field);
        }
      }
    }
  }
  updateValidators(form: FormGroup, name: string, validators: ValidatorFn[]) {
    if (!name || name == "" || !validators) return;
    let control = form.get(name);
    control.clearValidators();
    if (validators.length > 0) control.setValidators(validators);
    control.updateValueAndValidity();
  }
  patchDocumentForm(form: FormGroup, document: ConfirmationDocument) {
    if(!form || !document) return;
    form.patchValue({
      name: document.name,
      series: document.series,
      number: document.number,
      dateIssue: document.dateIssue,
      dateExpired: document.dateExpired,
    });
  }
  patchFullnameForm(form: FormGroup, person: Person) {
    if(!form || !person) return;
    form.patchValue({
      lastname: person.lastname,
      firstname: person.firstname,
      middlename: person.middlename,
      noMiddlename: person.noMiddlename
    });

  }
  patchIdentityCardForm(form: FormGroup, identityCard: IdentityCard) {
    if(!form || !identityCard) return;
    form.patchValue({
      identityCardType: identityCard.identityCardType,
      name: identityCard.name,
      series: identityCard.series,
      number: identityCard.number,
      issued: identityCard.issued,
      dateIssue: identityCard.dateIssue,
      dateExpired: identityCard.dateExpired,
      issueDepartmentCode: identityCard.issueDepartmentCode,
      actRecordNumber: identityCard.actRecordNumber,
      actRecordDate: identityCard.actRecordDate,
      actRecordPlace: identityCard.actRecordPlace,
    });
  }
}
