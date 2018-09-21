import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { FormService, Person } from '../../index';
import { IdentityCardComponent } from '../identity-card/identity-card.component';

@Component({
  selector: 'birth-info',
  templateUrl: './birth-info.component.html',
  styleUrls: ['./birth-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BirthInfoComponent implements OnInit {
  @Input() model: Person;
  @Input() identityCardComponent: IdentityCardComponent;

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

  compareBirthAndIssueDate(): ValidatorFn {
    return (birth: AbstractControl): { [key: string]: any } => {
      if (birth.dirty)
        if (birth.value >= this.identityCardComponent.identityCardForm.controls.dateIssue.value)
          return { custom: 'custom' };
    };
  }

  private buildForm() {
    this.birthInfoForm = this.fb.group({
      "birthDate": [
        "",
        [Validators.required,
        this.compareBirthAndIssueDate()]
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
