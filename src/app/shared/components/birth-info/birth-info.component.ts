import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService, Person } from '../../index';

@Component({
  selector: 'birth-info',
  templateUrl: './birth-info.component.html',
  styleUrls: ['./birth-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BirthInfoComponent implements OnInit {
  @Input() model: Person;

  constructor(private fb: FormBuilder, private formService: FormService) { }

  birthInfoForm: FormGroup
  formErrors = Person.getFormErrorsTemplate();
  validationMessages = Person.getvalidationMessages();
  currentDate = new Date();

  ngOnInit() {
    this.buildForm();
    if (this.model) {
      this.birthInfoForm.patchValue({
        birthDate: this.model.birthDate,
        birthPlace: this.model.birthPlace
      });
    }
  }
  private buildForm() {
    this.birthInfoForm = this.fb.group({
      "birthDate": [
        "",
        [Validators.required]
      ],
      "birthPlace": [
        "",
        [Validators.required]
      ]
    });
    this.birthInfoForm.valueChanges
      .subscribe(data => this.formService.onValueChange(this.birthInfoForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.birthInfoForm, this.formErrors, this.validationMessages);
  }
}
