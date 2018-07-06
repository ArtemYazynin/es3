import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AreaService, Area, AreaType, Entity, InstitutionService, FormService, Institution, Group, GroupService, inquiryType } from '../../shared/index';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox/typings/checkbox';

@Component({
  selector: 'app-curren-education-place-step',
  templateUrl: './curren-education-place-step.component.html',
  styleUrls: ['./curren-education-place-step.component.css']
})
export class CurrenEducationPlaceStepComponent implements OnInit {
  private currentMunicipality: Area;
  model: any = {
    municipalities: <Array<Area>>[],
    institutionsTypes: <Array<Entity<number>>>[],
    institutions: <Array<Institution>>[],
    groups: <Array<Group>>[]
  };

  currentPlaceForm: FormGroup;
  inquiryType: string;
  formErrors = {
    municipality: "",
    institutionType: ""
  }
  validationMessages = {
    municipality: { "required": "Обязательное поле." },
    institutionType: { "required": "Обязательное поле." },
  }
  constructor(private activatedRoute: ActivatedRoute, private areaService: AreaService, private institutionService: InstitutionService,
    private fb: FormBuilder, private formService: FormService, private router: Router, private groupService: GroupService) { }
  isValid() {
    return true;
  }
  private reset = {
    institutionsTypes: ()=>{
      this.model.institutionsTypes = [];
      this.currentPlaceForm.patchValue({ institutionType: "" });
    },
    institutions: ()=>{
      this.model.institutions = [];
      this.currentPlaceForm.patchValue({ institution: "" });
    },
    groups: ()=>{
      this.model.groups = [];
      this.currentPlaceForm.patchValue({ group: "" });
    }
  }
  onChange = {
    municipality: () => {
      this.reset.institutionsTypes();
      this.reset.institutions();
      this.reset.groups();

      this.init.institutionTypes();
    },
    institutionType: (val: number) => {
      this.reset.institutions();
      this.reset.groups();

      this.institutionService.getInstitutions(val).subscribe(result => {
        this.model.institutions = result;
      });
    },
    institution: (val: string) => {
      this.reset.groups();

      this.groupService.getGroup(val).subscribe(groups => {
        this.model.groups = groups;
      });
    },
    group: () => { },
    isOther: ((context) => {
      const otherControlName = "other";
      let addOrRemoveControl = (checked: boolean) => {
        let add = () => {
          let control = new FormControl("");
          control.setValidators([
            Validators.required,
            Validators.maxLength(250)
          ]);
          context.currentPlaceForm.addControl(otherControlName, control)
        }
        let remove = () => context.currentPlaceForm.removeControl(otherControlName);

        checked ? add() : remove();
      }
      let enableOrDisableControls = (checked: boolean) => {
        for (const key in context.currentPlaceForm.controls) {
          if (context.currentPlaceForm.controls.hasOwnProperty(key)) {
            const control = context.currentPlaceForm.controls[key];
            if (key == otherControlName || key == "isOther") continue;
            checked ? control.disable() : control.enable();
          }
        }
      }
      return (change: MatCheckboxChange) => {
        addOrRemoveControl(change.checked);
        enableOrDisableControls(change.checked);
      }
    })(this)
  }
  ngOnInit() {
    this.buildForm();
    this.init.inquiryType();
    this.init.institutionTypes();
    this.init.currentMunicipality();
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
        []
      ],
      "isOther": [
        false,
        []
      ]
    });
    this.currentPlaceForm.valueChanges
      .subscribe(() => this.formService.onValueChange(this.currentPlaceForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.currentPlaceForm, this.formErrors, this.validationMessages);
  }
  private init = {
    inquiryType:()=>{
      this.activatedRoute.params.forEach((params: Params) => {
        if (params["type"]) {
          this.inquiryType = params["type"];
        }
      });
    },
    currentMunicipality: () => {
      let municipalities = () => {
        this.areaService.getAreas(AreaType["Муниципалитет"]).subscribe(result => {
          this.model.municipalities = result;
          this.currentPlaceForm.patchValue({ municipality: this.model.municipalities.find(x => x.id == this.currentMunicipality.id).id });
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
        switch (this.inquiryType) {
          case inquiryType.preschool:
            this.model.institutionsTypes.push(result.find(x => x.id == 1));
            break;
          case inquiryType.school:
            this.model.institutionsTypes.push(result.find(x => x.id == 2));
            break;
          case inquiryType.healthCamp:
            this.model.institutionsTypes.push(result.find(x => x.id == 1 || x.id == 2));
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
        this.router.navigate(["/"]);
      },
      next: () => {

      }
    }
  })();
}
