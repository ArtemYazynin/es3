import { Component, OnInit, ChangeDetectionStrategy, DoCheck, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';
import { FormService, Person } from '../../index';

@Component({
  selector: 'full-name',
  templateUrl: './full-name.component.html',
  styleUrls: ['./full-name.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FullNameComponent implements OnInit {
  @Input() person: Person;
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";
  private noMiddlenameSubscription: Subscription;
  fullnameForm: FormGroup;
  formErrors = Person.getFormErrorsTemplate();
  validationMessages = Person.getvalidationMessages();
  constructor(private fb: FormBuilder, private formService: FormService) {

  }

  ngOnInit() {
    this.buildForm();
    if (this.person) {
      this.fullnameForm.patchValue({
        lastname: this.person.lastname,
        firstname: this.person.firstname,
        middlename: this.person.middlename,
        noMiddlename: this.person.noMiddlename
      });
    }
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
