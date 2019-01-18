import { TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { FormService } from './form.service';
import { ControlInfo } from './models/controlInfo.model';


describe('FormService', () => {
  let service: FormService;
  let fb: FormBuilder;
  const fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";
  const validationMessages = (() => {
    const required = "Обязательное поле.";
    let fioValidationObj = {
      required: required,
      maxlength: "Значение не должно быть больше 50 символов.",
      pattern: "Имя может состоять только из букв русского алфавита, пробела и дефиса."
    }
    return {
      lastname: fioValidationObj,
      firstname: fioValidationObj,
      birthDate: { required: required },
      birthPlace: { required: required },
    }
  })();
  let getFormErros = () => {
    return { lastname: "", firstname: "", birthDate: "", birthPlace: "" };
  }
  let buildForm = () => {
    return fb.group({
      "lastname": [
        "Тестович",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(fioRegExp)
        ]
      ],
      "firstname": [
        "Тест",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(fioRegExp)
        ]
      ],
      "birthDate": ["11.06.1990", [Validators.required]],
      "birthPlace": ["Mary city", [Validators.required]]
    });
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormService, FormBuilder
      ]
    });
    service = TestBed.get(FormService);
    fb = TestBed.get(FormBuilder);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('onValueChange. Form undefined. Should not have changes', () => {
    onValueChange(undefined, true);
  });

  it('onValueChange. ValidationMessages undefined. Should not have changes', () => {
    var formErrors = getFormErros();
    service.onValueChange(buildForm(), formErrors, undefined, true);
    for (const key in formErrors) {
      if (formErrors.hasOwnProperty(key)) {
        const value = formErrors[key];
        expect(value).toEqual("");
      }
    }
  });

  it('onValueChange. showIfDirtyOnly=true, VALID/Pristine controls. FormErrors should not has errors.', () => {
    onValueChange(buildForm(), true);
  });
  it('onValueChange. showIfDirtyOnly=true, VALID/Dirty controls. FormErrors should not has errors.', () => {
    let form = buildForm();
    markAs.dirty(form);
    onValueChange(form, true);
  });
  it('onValueChange. showIfDirtyOnly=true, INVALID/Pristine controls. FormErrors should not has errors.', () => {
    let form = buildForm();
    markAs.invalidRequired(form);
    onValueChange(form, true);
  });
  it('onValueChange. showIfDirtyOnly=true, INVALID/Dirty controls. FormErrors properties should have required error message.', () => {
    let form = buildForm();
    markAs.invalidRequired(form);
    markAs.dirty(form);
    onValueChange(form, true, validationMessages.lastname.required);
  });

  it('onValueChange. showIfDirtyOnly=false, VALID controls. FormErrors should not has errors.', () => {
    onValueChange(buildForm(), false);
  });

  it('onValueChange. showIfDirtyOnly=false, INVALID controls. FormErrors properties should have required error message.', () => {
    let form = buildForm();
    markAs.invalidRequired(form)
    onValueChange(form, false, validationMessages.firstname.required);
  });

  it('onValueChange. Invalid control has multiple error messages.', () => {
    let errorMsgs = [validationMessages.lastname.maxlength, validationMessages.lastname.pattern];
    let form = buildForm();
    let lastnameInvalidVal = "f".repeat(51);
    form.controls.lastname.setValue(lastnameInvalidVal);

    let formErrors = getFormErros();
    service.onValueChange(form, formErrors, validationMessages, false);

    errorMsgs.forEach(message => {
      expect(formErrors.lastname).toContain(message);
    });
  });

  let markAs = {
    dirty: (form: FormGroup) => {
      form.controls.lastname.markAsDirty(); form.controls.firstname.markAsDirty();
      form.controls.birthDate.markAsDirty(); form.controls.birthPlace.markAsDirty();
    },
    invalidRequired: (form: FormGroup) => {
      form.controls.lastname.setValue(""); form.controls.firstname.setValue("");
      form.controls.birthDate.setValue(""); form.controls.birthPlace.setValue("");
    }
  }

  let onValueChange = (form: FormGroup, showIfDirtyOnly: boolean, errorMsg: string = "") => {
    let formErrors = getFormErros();
    service.onValueChange(form, formErrors, validationMessages, showIfDirtyOnly);
    for (const key in formErrors) {
      if (formErrors.hasOwnProperty(key)) {
        const value: string = formErrors[key];
        expect(value).toEqual(errorMsg);
      }
    }
  }
  /*
    updateValidators не имеет тестов, т.к нельзя получить список валидаторов контрола
  */
});
