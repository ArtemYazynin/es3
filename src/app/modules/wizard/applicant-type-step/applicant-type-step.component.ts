import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType } from '../../../shared/index';
import { StepBase, WizardStorageService } from '../shared/index';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';

@Component({
  selector: 'app-applicant-type-step',
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantTypeStepComponent implements OnInit, StepBase {
  isValid(): boolean { return true; }
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  applicantType: ApplicantType = ApplicantType.Parent;
  applicantTypes: Array<ApplicantType> = [];
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private actionButtonService: ActionsButtonsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.applicantTypes = (() => {
      const types = [
        ApplicantType.Parent,
        ApplicantType.Applicant
      ];
      if (this.inquiryType === inquiryType.school && this.inquiry.children.length == 1) {
        types.push(ApplicantType.Child);
      }
      return types;
    })();
    this.applicantType = this.inquiry.applicantType || this.applicantTypes[0];
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionButtonService.primaryActionApplicantTypeStep(this.inquiry,this.applicantType,this.route),
      this.actionButtonService.inverseActionApplicantTypeStep(this.route)
    );
  }
}