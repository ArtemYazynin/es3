import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { CommonService, Institution, SettingsService, StepBase, WizardStorageService } from '../../shared';


@Component({
  selector: 'app-preschool-institution-step',
  templateUrl: './preschool-institution-step.component.html',
  styleUrls: ['./preschool-institution-step.component.css']
})
export class PreschoolInstitutionStepComponent implements OnInit, StepBase {
  inquiryType: string;
  form: FormGroup;
  maxCountWishPreschoolInstitutions: number;
  displayFn = this.commonService.displayFn;
  institutions = [
    new Institution("0C736803-E27E-4E9E-8209-A452002DB9AA", "МКДОУ Детский сад \"Тополёк\""),
    new Institution("0C806C63-5331-4B35-8F6F-A452002DB9B4", "МКДОУ Детский сад \"Ручеек\""),
    new Institution("3819A224-3F46-46C2-9CC0-A452002DB9B4", "МКДОУ Детский сад \"Сказка\""),
    new Institution("141C4B6A-6DB7-48BF-8407-A452002DB9B8", "МКДОУ Детский сад \"Фиалка\""),
    new Institution("5403F436-6D3F-4913-8922-A452002DB9BD", "МКДОУ Детский сад \"Росинка\""),
    new Institution("0159E3B6-B4B2-4018-9F75-A452002DB9C6", "МБДОУ №6 детский сад \"Снежинка\""),
  ];
  filteredInstitution: Observable<Array<Institution>>
  selectedInstitutions: Array<Institution> = [];

  isValid(): boolean {
    return this.selectedInstitutions.length > 0;
  }
  add(event: MatAutocompleteSelectedEvent) {
    this.selectedInstitutions.push(event.option.value);
    const index = this.institutions.indexOf(event.option.value);
    this.institutions.splice(index, 1);
    this.form.patchValue({ institution: "" });

    if (this.selectedInstitutions.length >= this.maxCountWishPreschoolInstitutions) {
      this.form.controls.institution.disable();
    }
  }
  move = (() => {
    let clone = (index: number) => {
      return Object.assign({}, this.selectedInstitutions[index]);
    }
    let removeSelected = (index: number) => {
      this.selectedInstitutions.splice(index, 1);
    }
    let up = (index) => {
      const institution = clone(index);
      removeSelected(index);
      this.selectedInstitutions.splice(index - 1, 0, institution);
    }
    let down = (index) => {
      const institution = clone(index);
      removeSelected(index);
      this.selectedInstitutions.splice(index + 1, 0, institution);
    }
    let trash = (index) => {
      const institution = clone(index);
      removeSelected(index);
      this.institutions.push(institution);
      this.form.controls.institution.updateValueAndValidity();
      if (this.form.controls.institution.disabled) this.form.controls.institution.enable();
    }
    return {
      up: up,
      down: down,
      trash: trash
    }
  })();
  goTo = {
    back: () => {
      this.router.navigate(["../inquiryInfoStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {
      this.storageService.set(this.inquiryType, {institutions:this.selectedInstitutions});
      this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.activatedRoute });
    }
  };

  constructor(private commonService: CommonService, private fb: FormBuilder, private settingsService: SettingsService,
    private router: Router, private activatedRoute: ActivatedRoute, private storageService:WizardStorageService) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
    this.settingsService.get().subscribe(result => {
      this.maxCountWishPreschoolInstitutions = result.maxCountWishPreschools;
    });
    this.form = this.fb.group({
      "institution": [
        "",
        []
      ]
    });
    this.filteredInstitution = this.form.controls.institution.valueChanges.pipe(
      startWith<string | Institution>(''),
      map((value: Institution) => typeof value === 'string' ? value : value.name),
      map((name: string) => {
        return name ? this.commonService.autoCompliteFilter(this.institutions, name) : this.institutions.slice();
      })
    );
  }

}
