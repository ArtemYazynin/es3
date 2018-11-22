import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormService, Person } from '../../index';

@Component({
  selector: 'app-edit-full-name',
  templateUrl: './edit-full-name.component.html',
  styleUrls: ['./edit-full-name.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EditFullNameComponent implements OnInit, OnDestroy {
  @Input() person: Person;

  id: string = Math.random().toString(36).substring(2);//for children required
  middlenameControl = "middlename".concat(this.id);
  noMiddlenameControl = "noMiddlename".concat(this.id);

  private ngUnsubscribe: Subject<any> = new Subject();
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";
  fullnameForm: FormGroup;
  formErrors = Person.getFormErrorsTemplate(this.id);
  validationMessages = Person.getvalidationMessages(this.id);
  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeOnMiddlename();
    if (this.person) {
      let data = {
        lastname: this.person.lastname,
        firstname: this.person.firstname
      }
      data[this.middlenameControl] = this.person.middlename;
      data[this.noMiddlenameControl] = this.person.noMiddlename;
      this.fullnameForm.patchValue(data);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getResult(): { lastname: string, firstname: string, middlename: string, noMiddlename: boolean } {
    return {
      lastname: this.fullnameForm.controls.lastname.value,
      firstname: this.fullnameForm.controls.firstname.value,
      middlename: this.fullnameForm.controls[this.middlenameControl].value,
      noMiddlename: this.fullnameForm.controls[this.noMiddlenameControl].value,
    }
  }

  private buildForm() {
    let controlsConfig = {
      "lastname": [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "firstname": [
        "",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ]
    }
    controlsConfig[this.middlenameControl] = [
      "", [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(this.fioRegExp)
      ]
    ]
    controlsConfig[this.noMiddlenameControl] = [
      false,
      []
    ]
    this.fullnameForm = this.fb.group(controlsConfig);
    this.fullnameForm.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }
  private onValueChange(data?: any) {
    this.formService.onValueChange(this.fullnameForm, this.formErrors, this.validationMessages);
  }

  private subscribeOnMiddlename(): void {
    let toggleMiddlenameValidators = noMiddlename => {
      const middlename = this.fullnameForm.get(this.middlenameControl);
      /** Массив валидаторов */
      const middlenameValidators: ValidatorFn[] = [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(this.fioRegExp)
      ];

      /** если есть отчество, добавляет валидаторы, если нет, очищает */
      middlename.clearValidators();
      if (!noMiddlename) {
        middlename.setValidators(middlenameValidators);
      }
      /** Обновляем состояние контрола */
      middlename.updateValueAndValidity();
    }
    this.fullnameForm.get(this.noMiddlenameControl)
      .valueChanges
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => toggleMiddlenameValidators(value));
  }


  isValid() {
    return this.fullnameForm && this.fullnameForm.valid;
  }
}
