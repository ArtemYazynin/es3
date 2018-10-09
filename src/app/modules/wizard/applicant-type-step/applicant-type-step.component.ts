import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, Inquiry, inquiryType } from '../../../shared/index';
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
  }

  goTo = {
    back: () => {
      this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
    },
    next: () => {
      Object.assign(this.inquiry, { applicantType: this.applicantType });
      switch (this.applicantType) {
        case ApplicantType.Applicant:
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
    }
  }
}
