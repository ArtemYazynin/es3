import { Component, OnInit, ViewChild } from '@angular/core';
import { inquiryType, StepBase } from '../../shared/index';
import { Router, ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { DistributionParamsComponent } from '../../shared/distribution-params/distribution-params.component';
import { StayModeComponent } from '../../shared/stay-mode/stay-mode.component';
import { AgeGroupComponent } from '../../shared/age-group/age-group.component';

@Component({
  selector: 'app-inquiry-info-step',
  templateUrl: './inquiry-info-step.component.html',
  styleUrls: ['./inquiry-info-step.component.css']
})
export class InquiryInfoStepComponent implements OnInit,StepBase {
  private inquiryType: string;
  @ViewChild(DistributionParamsComponent) distributionParamsComponent: DistributionParamsComponent;
  @ViewChild(StayModeComponent) stayModeComponent: StayModeComponent;
  @ViewChild(AgeGroupComponent) ageGroupComponent:AgeGroupComponent;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
  }
  isValid() {
    let stayModeIsValid = this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form 
      && this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form.valid;
    let ageGroupsIsValid = this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form 
      && this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form.valid;
    let distributionParamsIsValid = this.distributionParamsComponent.inquiryInfoForm
      && this.distributionParamsComponent.inquiryInfoForm.valid;
      
    return distributionParamsIsValid && stayModeIsValid && ageGroupsIsValid;
  }
  goTo = {
    back: () => {
      if (this.inquiryType == inquiryType.profEducation) {
        this.router.navigate(["../marksStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../privilegeStep"], { relativeTo: this.activatedRoute });
      }
    },
    next: () => {
      this.router.navigate(["../institutionStep"], { relativeTo: this.activatedRoute });
    }
  }
}
