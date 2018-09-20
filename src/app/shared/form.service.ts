import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl, ValidatorFn } from '@angular/forms';
import { ConfirmationDocument, Person, IdentityCard } from '.';

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
}
