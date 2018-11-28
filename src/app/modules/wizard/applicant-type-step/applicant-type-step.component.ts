import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType, Theme } from '../../../shared/index';
import { StepBase, WizardStorageService } from '../shared/index';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';

@Component({
  selector: 'app-applicant-type-step',
  providers: [ActionsButtonsService],
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantTypeStepComponent implements OnInit {
  isValid(): boolean { return true; }
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  applicantType: ApplicantType;
  applicantTypes: Array<ApplicantType> = [];
  buttonsTitles = ButtonsTitles;
  themes = Theme;
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private actionButtonService: ActionsButtonsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        this.actionButtonService.primaryActionApplicantTypeStep(this.inquiry, this.applicantType, this.route)
      },
      () => {
        this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
      }
    );
    this.inquiry = this.storageService.get(this.inquiry.type);
    this.applicantTypes = (() => {
      const types = [
        ApplicantType.Parent,
        ApplicantType.Applicant
      ];
      if (this.inquiry.type === inquiryType.school && this.inquiry.children.length == 1) {
        types.push(ApplicantType.Child);
      }
      return types;
    })();
    this.applicantType = this.inquiry.applicantType || this.applicantTypes[0];
  }
}