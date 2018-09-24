import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addressTypes, Applicant, ApplicantType, AttachmentType, CitizenshipService, CommonService, Country, DublicatesFinder, FormService, IdentityCard, Inquiry } from '../../../shared/index';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditPersonComponent) editParentComponent: EditPersonComponent;

  constructor(private citizenshipService: CitizenshipService, private router: Router,
    private route: ActivatedRoute, private storageService: WizardStorageService,
    private commonService: CommonService, private cdr: ChangeDetectorRef, private formService: FormService) { }

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  applicantTypes = ApplicantType;

  isValid(): boolean {
    if (!this.editParentComponent.confirmationDocuments) return false;
    let isValid = {
      identityCardForm: this.editParentComponent.identityCardComponent
        && this.editParentComponent.identityCardComponent.identityCardForm
        && this.editParentComponent.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.editParentComponent.fullnameComponent && this.editParentComponent.fullnameComponent.fullnameForm
        && this.editParentComponent.fullnameComponent.fullnameForm.valid || false,
      countryStateDocumentForm: (() => {
        if (!this.editParentComponent.citizenshipSelectComponent || this.editParentComponent.citizenshipSelectComponent.citizenships.length == 0) return false;
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.editParentComponent.citizenshipSelectComponent.citizenships, this.editParentComponent.countries);
        if (!hasForeignCitizenship) return true;

        return (() => {
          if (!this.editParentComponent.confirmationDocuments) return false;
          let component = this.editParentComponent.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateApplicantDocument);
          return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
        })();
      })(),
      applicantRepresentDocumentForm: (() => {
        let component = this.editParentComponent.confirmationDocuments.find(x => x.type == AttachmentType.ApplicantRepresentParent);
        return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid
      })()
    }
    return isValid.fullnameForm
      && isValid.identityCardForm
      && isValid.countryStateDocumentForm
      && isValid.applicantRepresentDocumentForm;
  }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
    },
    next: () => {
      let applicant = this.commonService.buildApplicant(this.editParentComponent, this.inquiry.applicantType)

      if (DublicatesFinder.betweenApplicantChildren(applicant, this.inquiry.children)) return;
      if (DublicatesFinder.betweenChildren(this.inquiry.children)) return;
      if (DublicatesFinder.betweenApplicantParent(this.inquiry.applicant, this.inquiry.parent)) return;

      this.storageService.set(this.inquiryType, { applicant: applicant });
      if (this.inquiry.applicantType == ApplicantType.Parent) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../parentStep"], { relativeTo: this.route });
      }
    }
  }
}
