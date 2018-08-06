import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService, Person } from '../../shared';

@Component({
  selector: 'birth-info',
  templateUrl: './birth-info.component.html',
  styleUrls: ['./birth-info.component.css']
})
export class BirthInfoComponent implements OnInit {

  constructor(private fb: FormBuilder, private formService: FormService) { }

  birthInfoForm: FormGroup
  formErrors = Person.getFormErrorsTemplate();
  validationMessages = Person.getvalidationMessages();
  currentDate = new Date();

  ngOnInit() {
    this.buildForm();
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
