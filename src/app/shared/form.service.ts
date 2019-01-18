import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ControlInfo } from './models/controlInfo.model';

@Injectable()
export class FormService {

  constructor() { }
  onValueChange(form: FormGroup, formErrors: object, validationMessages: object, showIfDirtyOnly: boolean = true) {
    if (!form || !formErrors || !validationMessages) return;
    let setMessage = (control: AbstractControl, field: string) => {
      let message = validationMessages[field];
      for (let key in control.errors) {
        formErrors[field] += message[key];
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

  
  updateValidators(form: FormGroup, controls: Array<ControlInfo>) {
    if (!controls || !form) return;
    controls.forEach(element => {
      if (!element || element.name == "") return;
      let control = form.get(element.name);
      control.clearValidators();
      if (element.validators.length > 0) control.setValidators(element.validators);
      control.updateValueAndValidity();
    });
  }
}