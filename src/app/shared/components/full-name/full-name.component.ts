import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormService, Person } from '../../index';

@Component({
  selector: 'full-name',
  templateUrl: './full-name.component.html',
  styleUrls: ['./full-name.component.css']
})
export class FullNameComponent implements OnInit {

  constructor(private fb: FormBuilder, private formService: FormService) {
    this.buildForm();
  }

  fullnameForm: FormGroup;
  formErrors = Person.getFormErrorsTemplate();
  validationMessages = Person.getvalidationMessages();
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";
  private noMiddlenameSubscription: Subscription;

  ngOnInit() {

    this.subscribeOnMiddlename();
  }


  private buildForm() {
    this.fullnameForm = this.fb.group({
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
      ],
      "middlename": [
        "", [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "noMiddlename": [
        false,
        []
      ]
    });
    this.fullnameForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }
  private onValueChange(data?: any) {
    this.formService.onValueChange(this.fullnameForm, this.formErrors, this.validationMessages);
  }

  private subscribeOnMiddlename(): void {
    let toggleMiddlenameValidators = noMiddlename => {
      const middlename = this.fullnameForm.get('middlename');
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
    this.noMiddlenameSubscription = this.fullnameForm.get('noMiddlename')
      .valueChanges
      .subscribe(value => toggleMiddlenameValidators(value));
  }
  ngOnDestroy() {
    this.noMiddlenameSubscription.unsubscribe();
  }
}
