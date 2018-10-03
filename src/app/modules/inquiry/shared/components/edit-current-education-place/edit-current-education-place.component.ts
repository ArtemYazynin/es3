import { ChangeDetectionStrategy, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatCheckboxChange, MatSelectChange } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Area, AreaService, AreaType, CommonService, Entity, FormService, Group, Inquiry, inquiryType, Institution, InstitutionService, GroupService } from '../../../../../shared';
import { CurrentEducationPlaceStepService } from '../../../../wizard/shared';

@Component({
  selector: 'app-edit-current-education-place',
  templateUrl: './edit-current-education-place.component.html',
  styleUrls: ['./edit-current-education-place.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCurrentEducationPlaceComponent implements OnInit, OnDestroy {
  @Input() inquiry: Inquiry;
  private ngUnsubscribe: Subject<any> = new Subject();
  private currentMunicipality: Area;
  private municipalities: Array<Area> = [];
  private institutions: Array<Institution> = [];
  filteredMunicipalities: Observable<Array<Area>>;
  institutionsTypes: Array<Entity<number>> = [];
  filteredInstitutions: Observable<Array<Institution>>;
  groups: Array<Group> = [];
  currentPlaceForm: FormGroup;
  formErrors = this.service.getFormErrors();
  validationMessages = this.service.getValidationMessages();
  displayFn = this.commonService.displayFn;

  constructor(private areaService: AreaService, private institutionService: InstitutionService,
    private formService: FormService, private service: CurrentEducationPlaceStepService, private commonService: CommonService,
    private groupService: GroupService) { }

  ngOnInit() {
    this.buildForm();
    this.init.institutionTypes();
    this.init.municipalities();
    this.init.fromSessionStorage();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isValid() {
    return this.currentPlaceForm && this.currentPlaceForm.valid || false;
  }

  private buildForm() {
    this.currentPlaceForm = this.service.getFormGroup();
    this.currentPlaceForm.valueChanges.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.formService.onValueChange(this.currentPlaceForm, this.formErrors, this.validationMessages));
    this.formService.onValueChange(this.currentPlaceForm, this.formErrors, this.validationMessages);
  }

  private init = (() => {
    const groups = (institutionId: string) => {
      this.groupService.getGroups(institutionId).pipe(takeUntil(this.ngUnsubscribe)).subscribe(groups => {
        this.groups = groups;
        this.checkGroups();
      });
    }
    const institutions = (institutionType?: number) => {
      this.institutionService.getInstitutions(institutionType).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
        this.institutions = result;
        this.filteredInstitutions = this.currentPlaceForm.controls.institution.valueChanges.pipe(
          startWith<string | Institution>(''),
          map((value: Institution) => {
            return typeof value === 'string' ? value : value.name;
          }),
          map((name: string) => {
            return name ? this.commonService.autoCompliteFilter(this.institutions, name) : this.institutions.slice();
          })
        );
      });
    }
    return {
      municipalities: () => {
        let municipalities = () => {
          this.areaService.getAreas(AreaType["Муниципалитет"]).pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
            this.municipalities = result;
            this.filteredMunicipalities = this.currentPlaceForm.controls.municipality.valueChanges.pipe(
              startWith<string | Area>(''),
              map((value: Area) => {
                return typeof value === 'string' ? value : value.name;
              }),
              map((name: string) => {
                return name ? this.commonService.autoCompliteFilter(this.municipalities, name) : this.municipalities.slice();
              })
            );
            this.currentPlaceForm.patchValue({ municipality: this.municipalities.find(x => x.id == this.currentMunicipality.id) }, { emitEvent: true });
          })
        }
        this.areaService.getCurrentMunicipality().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
          this.currentMunicipality = result;
          switch (this.inquiry.type) {
            case inquiryType.preschool:
              municipalities();
              break;
            case inquiryType.school:
              municipalities();
              break;
            case inquiryType.healthCamp:
              break;
            default:
              break;
          }
        });
      },
      institutionTypes: () => {
        this.institutionService.getTypes().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
          const preschoolType = 1;
          const schoolType = 2;
          switch (this.inquiry.type) {
            case inquiryType.preschool:
              this.institutionsTypes.push(result.find(x => x.id == preschoolType));
              break;
            case inquiryType.school:
              this.institutionsTypes.push(result.find(x => x.id == schoolType));
              break;
            case inquiryType.healthCamp:
              this.institutionsTypes.push(result.find(x => x.id == preschoolType || x.id == schoolType));
              break;
            default:
              break;
          }
        });
      },
      institutions: institutions,
      groups: groups,
      fromSessionStorage: () => {
        if (!this.inquiry || !this.inquiry.currentEducationPlace) return;
        const patch = (() => {
          if (this.inquiry.currentEducationPlace.isOther) {
            let params = (() => {
              let result = new MatCheckboxChange();
              result.checked = true;
              return result;
            })();
            this.onChange.isOther(params)
            return {
              isOther: this.inquiry.currentEducationPlace.isOther,
              other: this.inquiry.currentEducationPlace.other
            }
          } else {
            institutions(this.inquiry.currentEducationPlace.institutionType);
            groups(this.inquiry.currentEducationPlace.institution["id"]);
            this.checkGroups();
            return {
              municipality: this.inquiry.currentEducationPlace.municipality,
              institutionType: this.inquiry.currentEducationPlace.institutionType,
              institution: this.inquiry.currentEducationPlace.institution,
              group: this.inquiry.currentEducationPlace.group ? this.inquiry.currentEducationPlace.group.id : "",
              isOther: this.inquiry.currentEducationPlace.isOther
            }
          }
        })();
        this.currentPlaceForm.patchValue(patch);
      }
    }
  })();

  onChange = (() => {
    const otherControlName = "other";
    let reset = {
      institutionsTypes: () => {
        this.institutionsTypes = [];
        this.currentPlaceForm.patchValue({ institutionType: "" });
      },
      institutions: () => {
        this.institutions = [];
        this.filteredInstitutions = undefined;
        this.currentPlaceForm.patchValue({ institution: "" });
      },
      groups: () => {
        this.groups = [];
        this.currentPlaceForm.patchValue({ group: "" });
      }
    }

    let addOrRemoveControl = (checked: boolean) => {
      let add = () => {
        let control = new FormControl("");
        control.setValidators([
          Validators.required,
          Validators.maxLength(250)
        ]);
        this.currentPlaceForm.addControl(otherControlName, control)
      }
      let remove = () => this.currentPlaceForm.removeControl(otherControlName);

      checked ? add() : remove();
    }
    let enableOrDisableControls = (checked: boolean) => {
      for (const key in this.currentPlaceForm.controls) {
        if (this.currentPlaceForm.controls.hasOwnProperty(key)) {
          const control = this.currentPlaceForm.controls[key];
          if (key == otherControlName || key == "isOther") continue;
          checked ? control.disable() : control.enable();
        }
      }
    }
    return {
      municipality: () => {
        reset.institutionsTypes();
        reset.institutions();
        reset.groups();
        this.init.institutionTypes();
      },
      institutionType: (change: MatSelectChange) => {
        reset.institutions();
        reset.groups();
        this.init.institutions(change.value);

      },
      institution: (change: MatAutocompleteSelectedEvent) => {
        reset.groups();
        this.init.groups((<Institution>change.option.value).id)
      },
      group: () => { },
      isOther: (change: MatCheckboxChange) => {
        addOrRemoveControl(change.checked);
        enableOrDisableControls(change.checked);
      }
    }
  })();
  private checkGroups() {
    if (!this.groups || this.groups.length == 0) {
      this.currentPlaceForm.controls.group.clearValidators();
      this.currentPlaceForm.controls.group.updateValueAndValidity();
    }

    else if (this.currentPlaceForm.controls.group.validator == null || this.currentPlaceForm.controls.group.validator.length == 0) {
      this.currentPlaceForm.controls.group.setValidators([Validators.required]);
      this.currentPlaceForm.controls.group.updateValueAndValidity();
    }

  }
}
