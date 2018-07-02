import { Component, OnInit } from '@angular/core';
import { ApplicantType, FormService, WizardStorageService, Entity } from "../../shared/index";
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-applicant-type-step',
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css']
})
export class ApplicantTypeStepComponent implements OnInit {
  inquiryType: string;
  applicantType: ApplicantType = ApplicantType["Законный представитель ребенка"];
  applicantTypes:Array<Entity<number>> = [];
  

  constructor(private storageService: WizardStorageService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
        this.applicantTypes = (() => {
          let result: Array<Entity<number>> = [];
          let groupOfId = ApplicantType.values();
          for (let index = 0, len = groupOfId.length; index < len; index++) {
            let _id = parseInt(groupOfId[index]);
            if (_id === ApplicantType["Ребенок-заявитель"] && this.inquiryType === "preschool") {
              continue;
            }
            result.push({
              id: _id,
              name: ApplicantType[groupOfId[index]]
            });
          }
    
          return result;
        })();
      }
    });
    
  }
  public goToParentStep() {
    this.storageService.applicantType = this.applicantType;
    this.router.navigate(["../parentStep"], { relativeTo: this.activatedRoute });
  }
}
