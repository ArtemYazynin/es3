import { Component, OnInit, ViewChild } from '@angular/core';
import { inquiryType } from '../../shared/index';
import { Router, ActivatedRoute, Params } from '../../../../node_modules/@angular/router';
import { DistributionParamsComponent } from '../../shared/distribution-params/distribution-params.component';
import { StayModeComponent } from '../../shared/stay-mode/stay-mode.component';

@Component({
  selector: 'app-inquiry-info-step',
  templateUrl: './inquiry-info-step.component.html',
  styleUrls: ['./inquiry-info-step.component.css']
})
export class InquiryInfoStepComponent implements OnInit {
  private inquiryType: string;
  @ViewChild(DistributionParamsComponent) distributionParamsComponent: DistributionParamsComponent;
  @ViewChild(StayModeComponent) stayModeComponent: StayModeComponent;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
  }
  isValid() {
    let stayModeIsValid = this.stayModeComponent.stayModeForm && this.stayModeComponent.stayModeForm.valid;
    let distributionParamsIsValid = this.distributionParamsComponent.inquiryInfoForm
      && this.distributionParamsComponent.inquiryInfoForm.valid;
    return distributionParamsIsValid && stayModeIsValid;
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
