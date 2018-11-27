import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { flatMap, map, startWith, takeUntil } from 'rxjs/operators';
import { CommonService, Group, GroupService, inquiryType, InquiryType, Institution, InstitutionService, SchoolClass, SettingsService } from '../../../../../shared';

@Component({
  selector: 'app-edit-institutions',
  templateUrl: './edit-institutions.component.html',
  styleUrls: ['./edit-institutions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInstitutionsComponent implements OnInit, OnDestroy {
  @Input() institutions: Array<Institution>;
  @Input() IsLearnEducCenter: boolean;
  @Input() schoolClasses: Array<SchoolClass>;
  @Input() inquiryType: string;

  private ngUnsubscribe: Subject<any> = new Subject();
  form: FormGroup;
  inquiryTypes = inquiryType;
  maxCountWishInstitutions: number;
  displayFn = this.commonService.displayFn;
  filteredInstitution: Observable<Array<Institution>>
  selectedInstitutions: Array<any> = [];
  $classes: Observable<Array<Group>>;
  private institutionsForChoice: Array<Institution>;

  constructor(private commonService: CommonService, private institutionService: InstitutionService, private fb: FormBuilder,
    private settingsService: SettingsService, private groupService: GroupService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.buildForm();

    this.settingsService.get()
      .pipe(takeUntil(this.ngUnsubscribe), flatMap(settings => {
        switch (this.inquiryType) {
          case this.inquiryTypes.preschool:
            this.maxCountWishInstitutions = settings.maxCountWishPreschools;
            break;
          case this.inquiryTypes.school:
            this.maxCountWishInstitutions = settings.maxCountWishSchools;
          default:
            break;
        }
        return this.institutionService.getInstitutions(this.inquiryType == inquiryType.preschool ? InquiryType.preschool : InquiryType.school)
      })).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.institutionsForChoice = result;
        this.filteredInstitution = this.form.controls.institution.valueChanges.pipe(
          startWith<string | Institution>(''),
          map((value: Institution) => typeof value === 'string' ? value : value.name),
          map((name: string) => {
            //this.form.controls.class.patchValue("");
            if (name) {
              return this.commonService.autoCompliteFilter(this.institutionsForChoice, name);
            }
            return this.institutionsForChoice.slice();
          })
        );

        this.initFromSessionStorage();
        this.cdr.markForCheck();
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
      switch (this.inquiryType) {
        case this.inquiryTypes.preschool:
          this._add(institution);
          this.blur(inputElement);
          break;
        case this.inquiryTypes.school:
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
      switch (this.inquiryType) {
        case this.inquiryTypes.preschool:
          return this.institutions || def;
        case this.inquiryTypes.school: {
          if (this.IsLearnEducCenter)
            this.form.controls.IsLearnEducCenter.setValue(this.IsLearnEducCenter);
          return this.schoolClasses || def;
        }
        default:
          return def
      }
    })();
    array.forEach(element => {
      this._add(element);
    });
    this.cdr.markForCheck();
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

    const index = this.institutionsForChoice.findIndex(elem => {
      let id = val["institution"] ? val["institution"]["id"] : val.id;
      return elem.id == id;
    });
    this.institutionsForChoice.splice(index, 1);

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
      this.institutionsForChoice.push(obj["institution"] ? obj["institution"] : obj);
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
    if (this.inquiryType == inquiryType.school) {
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
