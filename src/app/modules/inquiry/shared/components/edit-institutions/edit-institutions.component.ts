import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { CommonService, Group, GroupService, Inquiry, inquiryType, InquiryType, Institution, InstitutionService, SchoolClass, SettingsService, Theme } from '../../../../../shared';

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
  inquiryType = inquiryType;
  maxCountWishInstitutions: number;
  displayFn = this.commonService.displayFn;
  filteredInstitution: Observable<Array<Institution>>
  selectedInstitutions: Array<any> = [];
  $classes: Observable<Array<Group>>;
  themes = Theme;
  private institutions: Array<Institution>;

  constructor(private commonService: CommonService, private institutionService: InstitutionService, private fb: FormBuilder,
    private settingsService: SettingsService, private groupService: GroupService) { }

  ngOnInit() {
    this.buildForm();

    this.settingsService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        switch (this.inquiry.type) {
          case inquiryType.preschool:
            this.maxCountWishInstitutions = result.maxCountWishPreschools;
            break;
          case inquiryType.school:
            this.maxCountWishInstitutions = result.maxCountWishSchools;
          default:
            break;
        }
      });
    this.institutionService.getInstitutions(this.inquiry.type == inquiryType.preschool ? InquiryType.preschool : InquiryType.school)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(result => {
        this.institutions = result;
        this.filteredInstitution = this.form.controls.institution.valueChanges.pipe(
          startWith<string | Institution>(''),
          map((value: Institution) => typeof value === 'string' ? value : value.name),
          map((name: string) => {
            //this.form.controls.class.patchValue("");
            if (name) {
              return this.commonService.autoCompliteFilter(this.institutions, name);
            }

            return this.institutions.slice();
          })
        );

        this.initFromSessionStorage();
      });
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isValid(): boolean {
    return this.selectedInstitutions.length > 0;
  }

  onChange = {
    institution: (event: MatAutocompleteSelectedEvent, inputElement: any) => {
      if (!event || !event.option || !event.option.value) return;

      const institution = event.option.value;
      switch (this.inquiry.type) {
        case inquiryType.preschool:
          this._add(institution);
          this.blur(inputElement);
          break;
        case inquiryType.school:
          this.$classes = this.groupService.getGroups(institution.id);
        default:
          break;
      }
    },
    class: (change: MatSelectChange) => {
      this._add(change.value);
    }
  }

  private initFromSessionStorage() {
    let array: Array<Institution | SchoolClass> = (() => {
      const def = [];
      switch (this.inquiry.type) {
        case inquiryType.preschool:
          return this.inquiry.institutions || def;
        case inquiryType.school: {
          if (this.inquiry.IsLearnEducCenter)
            this.form.controls.IsLearnEducCenter.setValue(this.inquiry.IsLearnEducCenter);
          return this.inquiry.schoolClasses || def;
        }
        default:
          return def
      }
    })();
    array.forEach(element => {
      this._add(element);
    });
  }
  private blur(inputElement: any) {
    /* 
          angular.material bug 
          https://github.com/angular/material2/issues/9061
        */
    inputElement.blur();//fix
  }

  private _add(val: Institution | Group) {
    if (!val) return;
    this.selectedInstitutions.push(val);

    const index = this.institutions.findIndex(elem => {
      let id = val["institution"] ? val["institution"]["id"] : val.id;
      return elem.id == id;
    });
    this.institutions.splice(index, 1);

    this.form.patchValue({ institution: "" });

    (function disableIfMaxCountReceived(outer) {
      if (outer.selectedInstitutions.length >= outer.maxCountWishInstitutions) {
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
      const obj = clone(index);
      removeSelected(index);
      this.institutions.push(obj["institution"] ? obj["institution"] : obj);
      this.form.controls.institution.updateValueAndValidity();
      if (this.form.controls.institution.disabled) this.form.controls.institution.enable();
    }
    return {
      up: up,
      down: down,
      trash: trash
    }
  })();

  buildForm() {
    let config = {
      "institution": [
        "",
        []
      ]
    }
    if (this.inquiry.type == inquiryType.school) {
      config["class"] = [
        "",
        []
      ];
      config["IsLearnEducCenter"] = [
        false,
        []
      ];
    }
    this.form = this.fb.group(config);
  }
}
