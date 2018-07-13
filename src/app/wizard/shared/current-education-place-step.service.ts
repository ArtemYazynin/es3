import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CurrentEducationPlaceStepService {

  constructor(private fb: FormBuilder) { }

  getFormGroup(): FormGroup {
    return this.fb.group({
      "municipality": [
        "",
        [Validators.required]
      ],
      "institutionType": [
        "",
        [Validators.required]
      ],
      "institution": [
        "",
        [Validators.required]
      ],
      "group": [
        "",
        [Validators.required]
      ],
      "isOther": [
        false,
        []
      ]
    });
  }
  getFormErrors(): any {
    return {
      municipality: "",
      institutionType: "",
      institution: "",
      other: ""
    };
  }
  getValidationMessages(): any {
    let required = { "required": "Обязательное поле." };
    return {
      municipality: required,
      institutionType: required,
      institution: required,
      other: Object.assign({}, required, { maxlength: "Значение не должно быть больше 250 символов." })
    };
  }
}
