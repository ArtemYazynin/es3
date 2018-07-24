import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '../../../../node_modules/@angular/router';
import { AgeGroupComponent } from '../../shared/age-group/age-group.component';
import { DistributionParamsComponent } from '../../shared/distribution-params/distribution-params.component';
import { AgeGroup, DistributionParams, InquiryInfo, inquiryType, StayMode, StepBase, WizardStorageService } from '../../shared/index';
import { StayModeComponent } from '../../shared/stay-mode/stay-mode.component';

@Component({
  selector: 'app-inquiry-info-step',
  templateUrl: './inquiry-info-step.component.html',
  styleUrls: ['./inquiry-info-step.component.css']
})
export class InquiryInfoStepComponent implements OnInit, StepBase {
  inquiryType: string;
  @ViewChild(DistributionParamsComponent) distributionParamsComponent: DistributionParamsComponent;
  @ViewChild(StayModeComponent) stayModeComponent: StayModeComponent;
  @ViewChild(AgeGroupComponent) ageGroupComponent: AgeGroupComponent;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private storgageService: WizardStorageService) { }

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
      const inquiryInfo = (() => {
        const distributionParams = DistributionParams.constructFromForm(this.distributionParamsComponent.inquiryInfoForm);
        const stayMode = StayMode.constructFromForm(this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
        const ageGroup = AgeGroup.constructFromForm(this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
        return new InquiryInfo(distributionParams, stayMode, ageGroup);
      })();
      this.storgageService.update(this.inquiryType, { inquiryInfo: inquiryInfo });
      this.router.navigate(["../preschoolInstitutionStep"], { relativeTo: this.activatedRoute });
    }
  }
}
