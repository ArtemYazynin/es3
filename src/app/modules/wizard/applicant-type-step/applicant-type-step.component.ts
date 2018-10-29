import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType } from '../../../shared/index';
import { StepBase, WizardStorageService } from '../shared/index';

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

  constructor(private storageService: WizardStorageService,
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
      () => {
        Object.assign(this.inquiry, { applicantType: this.applicantType });
        const clearAddressInfo = () => {
          if (this.inquiry.parent) {
            this.inquiry.parent.register = undefined;
            this.inquiry.parent.residential = undefined;
            this.inquiry.parent.tempRegistrationExpiredDate = undefined;
            this.inquiry.parent.registerAddressLikeAsResidentialAddress = undefined;
          }
        }
        switch (this.applicantType) {
          case ApplicantType.Applicant:
            clearAddressInfo();
            this.storageService.set(this.inquiryType, this.inquiry)
            this.router.navigate(["../applicantStep"], { relativeTo: this.route });
            break;
          case ApplicantType.Parent:
            this.inquiry.applicant = undefined;
            this.storageService.set(this.inquiryType, this.inquiry)
            this.router.navigate(["../parentStep"], { relativeTo: this.route });
            break;
          case ApplicantType.Child:
            this.inquiry.applicant = undefined;
            this.inquiry.parent = undefined;
            this.storageService.set(this.inquiryType, this.inquiry);
            this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
          default:
            break;
        }
      },
      () => {
        this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
      }
    );
  }
}