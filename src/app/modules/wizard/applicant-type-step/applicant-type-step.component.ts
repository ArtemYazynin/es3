import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entity, inquiryType, Inquiry, ApplicantType } from '../../../shared/index';
import { StepBase, WizardStorageService } from '../shared/index';
import { ApplicantTypePipe } from '../../../shared/applicant-type.pipe';

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
    this.applicantTypes = (()=>{
      const types = [
        ApplicantType.Parent,
        ApplicantType.Applicant
      ];
      if (this.inquiryType !== inquiryType.preschool) {
        types.push(ApplicantType.Child);
      }
      return types;
    })();
    this.inquiry = this.storageService.get(this.inquiryType);
    this.applicantType = (this.inquiry && this.inquiry.applicantType) || ApplicantType.Parent;
  }
  goTo = {
    back: () => {
      this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
    },
    next: () => {
      Object.assign(this.inquiry, { applicantType: this.applicantType });
      if (this.applicantType == ApplicantType.Applicant) {
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
