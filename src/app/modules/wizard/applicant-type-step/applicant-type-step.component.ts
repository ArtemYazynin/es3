import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType, Theme } from '../../../shared/index';
import { WizardStorageService } from '../shared/index';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { from, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-applicant-type-step',
  providers: [ActionsButtonsService],
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantTypeStepComponent implements OnInit, OnDestroy {
  isValid(): boolean { return true; }
  private extras = { relativeTo: this.route };
  private subscription: Subscription;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  applicantType: ApplicantType;
  applicantTypes: Array<ApplicantType> = [];
  themes = Theme;
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.config = this.getConfig();
    this.inquiry = this.storageService.get(this.inquiry.type);
    this.subscription = Observable.create((observer) => observer.next([ApplicantType.Parent, ApplicantType.Applicant]))
      .pipe(map((types: Array<ApplicantType>) => {
        const childIsApplicant = this.inquiry.type === inquiryType.school && this.inquiry.children.length == 1;
        if (childIsApplicant) types.push(ApplicantType.Child);
        return types;
      }))
      .subscribe(types => {
        this.applicantTypes = types;
        this.applicantType = this.inquiry.applicantType || this.applicantTypes[0];
      });
  }

  getConfig() {
    return new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        let step;
        const updateInquiry = () => this.storageService.set(this.inquiry.type, this.inquiry)
        const clearApplicant = () => delete this.inquiry.applicant;
        const clearAddresses = () => {
          if (this.inquiry.parent) {
            this.inquiry.parent.register = undefined;
            this.inquiry.parent.residential = undefined;
            this.inquiry.parent.tempRegistrationExpiredDate = undefined;
            this.inquiry.parent.registerAddressLikeAsResidentialAddress = undefined;
          }
        }
        Object.assign(this.inquiry, { applicantType: this.applicantType });
        switch (this.applicantType) {
          case ApplicantType.Applicant:
            step = "applicantStep";
            clearAddresses();
            updateInquiry();
            break;
          case ApplicantType.Parent:
            step = "parentStep";
            clearApplicant();
            updateInquiry();
            break;
          case ApplicantType.Child:
            step = "contactInfoStep";
            clearApplicant();
            delete this.inquiry.parent;
            updateInquiry();

          default:
            break;
        }
        this.router.navigate([`../${step}`], this.extras);
      }
      , ()=> this.router.navigate(["../currentEducationPlaceStep"], this.extras));
  }
}