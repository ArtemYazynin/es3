import { Injectable } from '@angular/core';
import { FormGroup, AbstractControl } from '@angular/forms';

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
}
