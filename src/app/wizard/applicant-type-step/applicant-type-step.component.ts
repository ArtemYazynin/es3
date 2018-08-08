import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicantType, Entity, inquiryType, StepBase, WizardStorageService } from "../../shared";

@Component({
  selector: 'app-applicant-type-step',
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css']
})
export class ApplicantTypeStepComponent implements OnInit,StepBase {
  isValid(): boolean { return true; }
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  applicantType: ApplicantType = ApplicantType["Законный представитель ребенка"];
  applicantTypes: Array<Entity<number>> = [];


  constructor(private storageService: WizardStorageService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.applicantTypes = (() => {
      let result: Array<Entity<number>> = [];
      let groupOfId = ApplicantType.values();
      for (let index = 0, len = groupOfId.length; index < len; index++) {
        let _id = parseInt(groupOfId[index]);
        if (_id === ApplicantType["Ребенок-заявитель"] && this.inquiryType === inquiryType.preschool) {
          continue;
        }
        result.push({
          id: _id,
          name: ApplicantType[groupOfId[index]]
        });
      }

      return result;
    })();
    this.initFromSessionStorage();
  }
  initFromSessionStorage(){
    const inquiry = this.storageService.get(this.inquiryType);
    if (inquiry && inquiry.applicantType || false)  this.applicantType = inquiry.applicantType
   
  }
  goTo = {
    back: () => {
      this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
    },
    next: () => {
      this.storageService.set(this.inquiryType,{applicantType:this.applicantType})
      if (this.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]) {
        this.router.navigate(["../applicantStep"], { relativeTo: this.route });
      }
      else{
        this.router.navigate(["../parentStep"], { relativeTo: this.route });
      }
    }
  }
}
