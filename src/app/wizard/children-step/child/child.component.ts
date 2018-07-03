import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { FormService, WizardStorageService, CitizenshipService, SpecHealthService, Person, Parent, Country, SpecHealth, IdentityCardType } from '../../../shared/index';
import { BirthInfoComponent } from '../../../person/birth-info/birth-info.component';
import { FullNameComponent } from '../../../person/full-name/full-name.component';
import { IdentityCardComponent } from '../../../person/identity-card/identity-card.component';
import { CitizenshipSelectComponent } from '../../../person/citizenship-select/citizenship-select.component';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;

  constructor(private fb: FormBuilder, private formService: FormService,
    private storageService: WizardStorageService,
    private citizenshipService: CitizenshipService,
    private specHealthService: SpecHealthService) { }

  groupOfIdentityCardTypeId: Array<number> = [
    IdentityCardType["Паспорт РФ"],
    IdentityCardType["Свидетельство о рождении РФ"],
    IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"],
    IdentityCardType["Иностранный паспорт"]
  ];
  id: string = Math.random().toString(36).substring(2);
  show: boolean = false;
  countries: Array<Country> = [];
  specHealths: Array<SpecHealth> = [];
  childForm: FormGroup;
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());
  
  ngOnInit() {
    this.specHealthService.get().subscribe(result => { this.specHealths = result; });
    this.citizenshipService.getCountries().subscribe(result => { this.countries = result; });
    this.buildForm();
  }
  private buildForm() {
    this.childForm = this.fb.group({
      "snils": [
        "222-222-222 43",
        [
          Validators.required,
          Validators.maxLength(28),
          Validators.pattern("^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$")
        ]
      ],
      "citizenship": [
        "",
        [
          Validators.required
        ]
      ],
      "specHealth": [
        101,
        []
      ]
    });
    this.childForm.valueChanges.subscribe(data => this.formService.onValueChange(this.childForm, this.formErrors, this.validationMessages));
    this.formService.onValueChange(this.childForm, this.formErrors, this.validationMessages);
  }
}
