import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { takeUntil, startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';
import { Inquiry, Institution, CommonService, InstitutionService, SettingsService, inquiryType, InquiryType } from '../../../../../shared';

@Component({
  selector: 'app-edit-institutions',
  templateUrl: './edit-institutions.component.html',
  styleUrls: ['./edit-institutions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInstitutionsComponent implements OnInit, OnDestroy {
  @Input() inquiry: Inquiry;

  private ngUnsubscribe: Subject<any> = new Subject();
  form: FormGroup;
  maxCountWishPreschoolInstitutions: number;
  displayFn = this.commonService.displayFn;
  filteredInstitution: Observable<Array<Institution>>
  selectedInstitutions: Array<Institution> = [];
  private institutions: Array<Institution>;

  constructor(private commonService: CommonService, private institutionService: InstitutionService, private fb: FormBuilder, private settingsService: SettingsService) { }

  ngOnInit() {
    this.institutionService.getInstitutions(this.inquiry.type == inquiryType.preschool ? InquiryType.preschool : InquiryType.school)
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
        if (this.inquiry.institutions && this.inquiry.institutions.length > 0) {
          this.inquiry.institutions.forEach(element => {
            this._add(element);
          });
        }
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
  add(event: MatAutocompleteSelectedEvent, inputElement: any) {
    if (!event || !event.option || !event.option.value) return;
    const institution = event.option.value;
    this._add(institution);
    /* 
      angular.material bug 
      https://github.com/angular/material2/issues/9061
    */
    inputElement.blur();//fix

  }

  private _add(institution: Institution) {
    this.selectedInstitutions.push(institution);

    (function removeFromInstitutionList(outer) {
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
}
