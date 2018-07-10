import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IMyDpOptions } from 'mydatepicker/dist/interfaces/my-options.interface';

@Injectable()
export class FormService {

  constructor() { }
  onValueChange(form: FormGroup, formErrors: object, validationMessages: object) {
    if (!form) return;
    for (let field in formErrors) {
      formErrors[field] = "";
      // form.get - получение элемента управления
      let control = form.get(field);

      if (control && control.dirty && !control.valid) {
        let message = validationMessages[field];
        for (let key in control.errors) {
          formErrors[field] += message[key] + " ";
        }
      }
    }
  }
  

}
