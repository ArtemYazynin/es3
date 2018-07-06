import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AreaService, Area, AreaType, Entity, InstitutionService, FormService, Institution, Group, GroupService, inquiryType, CurrentEducationPlaceStepService, WizardStorageService, CurrentEducationPlace } from '../../shared/index';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox/typings/checkbox';

@Component({
  selector: 'app-curren-education-place-step',
  templateUrl: './current-education-place-step.component.html',
  styleUrls: ['./current-education-place-step.component.css']
})
export class CurrentEducationPlaceStepComponent implements OnInit {
  private currentMunicipality: Area;
  municipalities: Array<Area> = [];
  institutionsTypes: Array<Entity<number>> = [];
  institutions: Array<Institution> = [];
  groups: Array<Group> = [];

  currentPlaceForm: FormGroup;
  inquiryType: string;
  formErrors = this.service.getFormErrors();
  validationMessages = this.service.getValidationMessages();
  constructor(private activatedRoute: ActivatedRoute, private areaService: AreaService, private institutionService: InstitutionService,
    private formService: FormService, private router: Router, private groupService: GroupService,
    private service: CurrentEducationPlaceStepService, private storageService: WizardStorageService) { }
  isValid() {
    return this.currentPlaceForm && this.currentPlaceForm.valid || false;
  }

  onChange = ((global) => {
    const otherControlName = "other";
    let reset = {
      institutionsTypes: () => {
        global.institutionsTypes = [];
        global.currentPlaceForm.patchValue({ institutionType: "" });
      },
      institutions: () => {
        global.institutions = [];
        global.currentPlaceForm.patchValue({ institution: "" });
      },
      groups: () => {
        global.groups = [];
        global.currentPlaceForm.patchValue({ group: "" });
      }
    }

    let addOrRemoveControl = (checked: boolean) => {
      let add = () => {
        let control = new FormControl("");
        control.setValidators([
          Validators.required,
          Validators.maxLength(250)
        ]);
        global.currentPlaceForm.addControl(otherControlName, control)
      }
      let remove = () => global.currentPlaceForm.removeControl(otherControlName);

      checked ? add() : remove();
    }
    let enableOrDisableControls = (checked: boolean) => {
      for (const key in global.currentPlaceForm.controls) {
        if (global.currentPlaceForm.controls.hasOwnProperty(key)) {
          const control = global.currentPlaceForm.controls[key];
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

        global.init.institutionTypes();
      },
      institutionType: (val: number) => {
        reset.institutions();
        reset.groups();

        global.institutionService.getInstitutions(val).subscribe(result => {
          global.institutions = result;
        });
      },
      institution: (val: string) => {
        reset.groups();

        global.groupService.getGroup(val).subscribe(groups => {
          global.groups = groups;
        });
      },
      group: () => { },
      isOther: (change: MatCheckboxChange) => {
        addOrRemoveControl(change.checked);
        enableOrDisableControls(change.checked);
      }
    }
  })(this);
  ngOnInit() {
    this.buildForm();
    this.init.inquiryType();
    this.init.institutionTypes();
    this.init.currentMunicipality();
    if (this.storageService.request.currentEducationPlace) {
      this.currentPlaceForm.patchValue({ municipality: this.storageService.request.currentEducationPlace.municipality });
      for (const key in this.storageService.request.currentEducationPlace) {
        if (this.storageService.request.currentEducationPlace.hasOwnProperty(key)) {
          const value = this.storageService.request.currentEducationPlace[key];
          this.currentPlaceForm.patchValue({ key: value });
        }
      }
    }
  }
  private buildForm() {
    this.currentPlaceForm = this.service.getFormGroup();
    this.currentPlaceForm.valueChanges.subscribe(() => this.formService.onValueChange(this.currentPlaceForm, this.formErrors, this.validationMessages));
    this.formService.onValueChange(this.currentPlaceForm, this.formErrors, this.validationMessages);
  }
  private init = {
    inquiryType: () => {
      this.activatedRoute.params.forEach((params: Params) => {
        if (params["type"]) {
          this.inquiryType = params["type"];
        }
      });
    },
    currentMunicipality: () => {
      let municipalities = () => {
        this.areaService.getAreas(AreaType["Муниципалитет"]).subscribe(result => {
          this.municipalities = result;
          this.currentPlaceForm.patchValue({ municipality: this.municipalities.find(x => x.id == this.currentMunicipality.id).id });
        })
      }
      this.areaService.getCurrentMunicipality().subscribe(result => {
        this.currentMunicipality = result;
        switch (this.inquiryType) {
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
      })
    },
    institutionTypes: () => {
      this.institutionService.getTypes().subscribe(result => {
        const preschoolType = 1;
        const schoolType = 2;
        switch (this.inquiryType) {
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
      })
    }
  }

  onSubmit() {

  }

  goTo = (() => {
    return {
      back: () => {
        this.router.navigate(["../childrenStep"], { relativeTo: this.activatedRoute });
      },
      next: () => {
        this.storageService.currentEducationPlace = new CurrentEducationPlace(this.currentPlaceForm.value["municipality"],
          this.currentPlaceForm.value["institutionType"], this.currentPlaceForm.value["institution"],
          this.currentPlaceForm.value["group"], this.currentPlaceForm.value["isOther"], this.currentPlaceForm.value["other"])
      }
    }
  })();
}
