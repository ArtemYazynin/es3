import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApplicantType, Entity, inquiryType, StepBase, WizardStorageService, CompilationOfWizardSteps } from "../../shared";

@Component({
  selector: 'app-applicant-type-step',
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css']
})
export class ApplicantTypeStepComponent implements OnInit, StepBase {
  isValid(): boolean { return true; }
  inquiry: CompilationOfWizardSteps;
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
  initFromSessionStorage() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.applicantType = (this.inquiry && this.inquiry.applicantType) || ApplicantType["Законный представитель ребенка"];

  }
  goTo = {
    back: () => {
      this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
    },
    next: () => {
      Object.assign(this.inquiry, { applicantType: this.applicantType });
      if (this.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]) {
        this.storageService.set(this.inquiryType, this.inquiry)
        this.router.navigate(["../applicantStep"], { relativeTo: this.route });
      }
      else {
        this.inquiry.applicant = undefined;
        this.storageService.set(this.inquiryType, this.inquiry)
        this.router.navigate(["../parentStep"], { relativeTo: this.route });
      }
    }
  }
}
