import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CommonService, Institution, InstitutionService, SettingsService, StepBase, WizardStorageService, inquiryType, CompilationOfWizardSteps } from '../../shared';

@Component({
  selector: 'app-preschool-institution-step',
  templateUrl: './preschool-institution-step.component.html',
  styleUrls: ['./preschool-institution-step.component.css']
})
export class PreschoolInstitutionStepComponent implements OnInit, OnDestroy, StepBase {
  private ngUnsubscribe: Subject<any> = new Subject();
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  form: FormGroup;
  maxCountWishPreschoolInstitutions: number;
  displayFn = this.commonService.displayFn;
  private institutions: Array<Institution>
  filteredInstitution: Observable<Array<Institution>>
  selectedInstitutions: Array<Institution> = [];

  constructor(private commonService: CommonService, private fb: FormBuilder, private settingsService: SettingsService,
    private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private institutionService: InstitutionService) { }

  ngOnInit() {
    
    this.institutionService.getInstitutions(this.inquiryType == inquiryType.preschool ? 1 : 2)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.institutions = result;
        this.filteredInstitution = this.form.controls.institution.valueChanges.pipe(
          startWith<string | Institution>(''),
          map((value: Institution) => typeof value === 'string' ? value : value.name),
          map((name: string) => {
            return name ? this.commonService.autoCompliteFilter(this.institutions, name) : this.institutions.slice();
          })
        );
        (function initFromSessionStorage(outer){
          const inquiry = <CompilationOfWizardSteps>outer.storageService.get(outer.inquiryType);
          if (inquiry.institutions && inquiry.institutions.length > 0) {
            inquiry.institutions.forEach(element => {
              outer._add(element);
            });
          }
        })(this);
      });
    this.settingsService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.maxCountWishPreschoolInstitutions = result.maxCountWishPreschools;
      });
    this.form = this.fb.group({
      "institution": [
        "",
        []
      ]
    });
    
    
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  isValid(): boolean {
    return this.selectedInstitutions.length > 0;
  }
  add(event: MatAutocompleteSelectedEvent) {
    if (!event || !event.option || event.option.value) return;
    const institution = event.option.value;
    this._add(institution);
  }

  private _add(institution: Institution) {
    this.selectedInstitutions.push(institution);

    (function removeFromInstitutionList(outer){
      const index = outer.institutions.indexOf(institution);
      outer.institutions.splice(index, 1);
      outer.form.patchValue({ institution: "" });
    })(this);
   
    (function disableIfMaxCountReceived(outer) {
      if (outer.selectedInstitutions.length >= outer.maxCountWishPreschoolInstitutions) {
        outer.form.controls.institution.disable();
      }
    })(this);
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
      this.router.navigate(["../inquiryInfoStep"], { relativeTo: this.route });
    },
    next: () => {
      this.storageService.set(this.inquiryType, { institutions: this.selectedInstitutions });
      this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
    }
  };


}
