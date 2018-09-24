import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, AttachmentType, CitizenshipService, CommonService, DublicatesFinder, FormService, IdentityCard, Inquiry, inquiryType, Parent } from '../../../shared';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared';


@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditPersonComponent) editParentComponent: EditPersonComponent;

  inquiry: Inquiry;
  agree: boolean = false;

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;

  constructor(private storageService: WizardStorageService, private commonService: CommonService, private formService: FormService,
    private citizenshipService: CitizenshipService, private cdr: ChangeDetectorRef,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.agree = true;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  isValid(): boolean {
    let isValid = {
      identityCardForm: this.editParentComponent.identityCardComponent
        && this.editParentComponent.identityCardComponent.identityCardForm
        && this.editParentComponent.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.editParentComponent.fullnameComponent && this.editParentComponent.fullnameComponent.fullnameForm && this.editParentComponent.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: (() => {
        if (this.inquiry.applicantType !== ApplicantType.Child)
          return true;
        return this.editParentComponent.birthInfoComponent && this.editParentComponent.birthInfoComponent.birthInfoForm && this.editParentComponent.birthInfoComponent.birthInfoForm.valid || false;
      })(),
      countryStateForm: (() => {
        if (!this.editParentComponent.citizenshipSelectComponent || this.editParentComponent.citizenshipSelectComponent.citizenships.length == 0) return false;
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.editParentComponent.citizenshipSelectComponent.citizenships, this.editParentComponent.countries);
        if (!hasForeignCitizenship) return true;

        return (() => {
          if (!this.editParentComponent.confirmationDocuments) return false;
          let component = this.editParentComponent.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateDocument);
          return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
        })();
      })(),
      relationType: (() => {
        if (!this.editParentComponent.relationTypeComponent || !this.editParentComponent.relationTypeComponent.relationType) return false;
        if (!this.editParentComponent.relationTypeComponent.relationType.confirmationDocument) return true;

        return (() => {
          if (!this.editParentComponent.confirmationDocuments) return false;
          let component = this.editParentComponent.confirmationDocuments.find(x => x.type == AttachmentType.ParentRepresentChildren);
          return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
        })()
      })()
    }
    return this.agree
      && isValid.fullnameForm
      && isValid.identityCardForm
      && isValid.birthInfoForm
      && isValid.countryStateForm
      && isValid.relationType;
  }

  goTo = {
    back: () => {
      if (this.inquiry.applicantType == ApplicantType.Applicant) {
        this.router.navigate(["../applicantStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      }
    },
    next: () => {
      let parent = this.commonService.buildParent(this.editParentComponent, this.inquiry.applicantType);
      if (this.inquiry.applicantType == ApplicantType.Applicant) {
        if (DublicatesFinder.betweenApplicantParent(this.inquiry.applicant, parent)) return;
        if (DublicatesFinder.betweenApplicantChildren(this.inquiry.applicant, this.inquiry.children)) return;
        if (DublicatesFinder.betweenParentChildren(parent, this.inquiry.children)) return;
      } else if (this.inquiry.applicantType == ApplicantType.Parent) {
        if (DublicatesFinder.betweenParentChildren(parent, this.inquiry.children)) return;
      }
      this.storageService.set(this.inquiryType, { parent: parent });
      this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
    }
  }
}
