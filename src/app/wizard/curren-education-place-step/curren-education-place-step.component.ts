import { Component, OnInit } from '@angular/core';
import { Params, ActivatedRoute, Router } from '@angular/router';
import { AreaService, Area, AreaType, Entity, InstitutionService, FormService, Person, Institution } from '../../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-curren-education-place-step',
  templateUrl: './curren-education-place-step.component.html',
  styleUrls: ['./curren-education-place-step.component.css']
})
export class CurrenEducationPlaceStepComponent implements OnInit {
  private currentMunicipality:Area;
  inquiryType: string;
  municipalities: Array<Area> = [];
  institutionsTypes: Array<Entity<number>> = [];
  institutions:Array<Institution> = [];
  filtersForm: FormGroup;
  formErrors = {
    municipality: "",
    institutionType: ""
  }
  validationMessages = {
    municipality: { "required": "Обязательное поле." },
    institutionType: { "required": "Обязательное поле." },
  }
  constructor(private activatedRoute: ActivatedRoute, private areaService: AreaService, private institutionService: InstitutionService,
    private fb: FormBuilder, private formService: FormService,private router: Router) { }
  isValid() {
    return true;
  }
  onChange ={
    municipality:(val)=>{
      let s = this;
    },
    institutionType:(val)=>{
      this.institutionService.getInstitutions(val).subscribe(result=>{
        this.institutions = result;
      })
    },
    institution:(val)=>{
      
    }
  }
  ngOnInit() {
    this.buildForm();
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });
    let init = {
      currentMunicipality:()=>{
        let municipalities = () => {
          this.areaService.getAreas(AreaType["Муниципалитет"]).subscribe(result => {
            this.municipalities = result;
            this.filtersForm.patchValue({ municipality: this.municipalities.find(x=>x.id == this.currentMunicipality.id).id });
          })
        }
        this.areaService.getCurrentMunicipality().subscribe(result => {
          this.currentMunicipality = result;
          switch (this.inquiryType) {
            case "preschool":
              municipalities();  
              break;
            case "school":
              municipalities();
              break;
            case "healthCamp":
              //init.currentMunicipality()
              break;
            default:
              break;
          }
        })
      },
      institutionTypes: () => {
        this.institutionService.getTypes().subscribe(result => {
          switch (this.inquiryType) {
            case "preschool":
              this.institutionsTypes.push(result.find(x => x.id == 1));
              break;
            case "school":
              this.institutionsTypes.push(result.find(x => x.id == 2));
              break;
            case "healthCamp":
              this.institutionsTypes.push(result.find(x => x.id == 1 || x.id == 2));
              break;
            default:
              break;
          }
        })
      }
    }
    init.institutionTypes();
    init.currentMunicipality();  
  }
  private buildForm() {
    this.filtersForm = this.fb.group({
      "municipality": [
        "",
        [Validators.required]
      ],
      "institutionType": [
        "",
        [Validators.required]
      ],
      "institution":[
        "",
        [Validators.required]
      ]
    });
    this.filtersForm.valueChanges
      .subscribe(data => this.formService.onValueChange(this.filtersForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.filtersForm, this.formErrors, this.validationMessages);
  }

  onSubmit() {

  }
  displayFn(user?: Area): string | undefined {
    return user ? user.name : undefined;
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
