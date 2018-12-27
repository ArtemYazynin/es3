import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent, MatCheckboxChange, MatSelectChange } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { Area, AreaService, AreaType, CommonService, Entity, FormService, Group, GroupService, inquiryType, Institution, InstitutionService, InquiryType, Theme } from '../../../../../shared';
import { CurrentEducationPlaceService } from '../../../../../shared/current-place.service';
import { CurrentEducationPlace } from './../../../../../shared/models/current-education-place.model';

@Component({
  selector: 'app-edit-current-education-place',
  templateUrl: './edit-current-education-place.component.html',
  styleUrls: ['./edit-current-education-place.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{ 'class': 'host'},

})
export class EditCurrentEducationPlaceComponent implements OnInit, OnDestroy {
  @Input() currentEducationPlace: CurrentEducationPlace;
  @Input() inquiryType: string;

  private ngUnsubscribe: Subject<any> = new Subject();
  private currentMunicipality: Area;
  private municipalities: Array<Area> = [];
  private institutions: Array<Institution> = [];
  filteredMunicipalities: Observable<Array<Area>>;
  institutionsTypes: Array<Entity<number>> = [];
  filteredInstitutions: Observable<Array<Institution>>;
  groups: Array<Group> = [];
  currentPlaceForm: FormGroup;
  inquiryTypes = inquiryType;
  formErrors = CurrentEducationPlace.getFormErrors();
  validationMessages = CurrentEducationPlace.getValidationMessages();
  displayFn = this.commonService.displayFn;
  themes = Theme;
  
  constructor(private areaService: AreaService, private institutionService: InstitutionService, private fb: FormBuilder,
    private formService: FormService, private commonService: CommonService, private service: CurrentEducationPlaceService,
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
    return this.currentPlaceForm && this.currentPlaceForm.dirty && this.currentPlaceForm.valid || false;
  }

  private buildForm() {
    this.currentPlaceForm = this.fb.group({
      "municipality": [
        "",
        [Validators.required]
      ],
      "institutionType": [
        "",
        [Validators.required]
      ],
      "institution": [
        "",
        [Validators.required]
      ],
      "group": [
        "",
        [Validators.required]
      ],
      "isOther": [
        false,
        []
      ]
    });
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
          this.areaService.getAreas(AreaType.Municipality)
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(result => {
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
        this.areaService.getCurrentMunicipality()
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(currentMunicipality => {
            this.currentMunicipality = currentMunicipality;
            switch (this.inquiryType) {
              case this.inquiryTypes.preschool:
              case this.inquiryTypes.school:
                municipalities();
                break;
              case this.inquiryTypes.healthCamp:
                break;
              default:
                break;
            }
          });
      },
      institutionTypes: () => {
        this.institutionService.getTypes().pipe(takeUntil(this.ngUnsubscribe)).subscribe(result => {
          switch (this.inquiryType) {
            case inquiryType.preschool:
              this.institutionsTypes.push(result.find(x => x.id == InquiryType.preschool));
              break;
            case inquiryType.school:
              this.institutionsTypes.push(result.find(x => x.id == InquiryType.school));
              break;
            case inquiryType.healthCamp:
              this.institutionsTypes.push(result.find(x => x.id == InquiryType.preschool || x.id == InquiryType.school));
              break;
            default:
              break;
          }
        });
      },
      institutions: institutions,
      groups: groups,
      fromSessionStorage: () => {
        if (!this.currentEducationPlace) return;
        const patch = (() => {
          if (this.currentEducationPlace.isOther) {
            let control = (() => {
              let result = new MatCheckboxChange();
              result.checked = true;
              return result;
            })();
            this.onChange.isOther(control)
            return {
              isOther: this.currentEducationPlace.isOther,
              other: this.currentEducationPlace.other
            }
          } else {
            institutions(this.currentEducationPlace.institutionType);
            groups(this.currentEducationPlace.institution["id"]);
            this.checkGroups();
            return {
              municipality: this.currentEducationPlace.municipality,
              institutionType: this.currentEducationPlace.institutionType,
              institution: this.currentEducationPlace.institution,
              group: this.currentEducationPlace.group ? this.currentEducationPlace.group.id : "",
              isOther: this.currentEducationPlace.isOther
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

  getResult() {
    let newData = CurrentEducationPlace.buildByForm(this.currentPlaceForm, this.groups);
    Object.assign(this.currentEducationPlace, newData);
    return this.currentEducationPlace;
  }
}