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
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;

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
      identityCardForm: this.editPersonComponent.identityCardComponent
        && this.editPersonComponent.identityCardComponent.identityCardForm
        && this.editPersonComponent.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.editPersonComponent.fullnameComponent && this.editPersonComponent.fullnameComponent.fullnameForm && this.editPersonComponent.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: (() => {
        if (this.inquiry.applicantType !== ApplicantType.Child)
          return true;
        return this.editPersonComponent.birthInfoComponent && this.editPersonComponent.birthInfoComponent.birthInfoForm && this.editPersonComponent.birthInfoComponent.birthInfoForm.valid || false;
      })(),
      countryStateForm: (() => {
        if (!this.editPersonComponent.citizenshipSelectComponent || this.editPersonComponent.citizenshipSelectComponent.citizenships.length == 0) return false;
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.editPersonComponent.citizenshipSelectComponent.citizenships, this.editPersonComponent.countries);
        if (!hasForeignCitizenship) return true;

        return (() => {
          if (!this.editPersonComponent.confirmationDocuments) return false;
          let component = this.editPersonComponent.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateDocument);
          return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
        })();
      })(),
      relationType: (() => {
        if (!this.editPersonComponent.relationTypeComponent || !this.editPersonComponent.relationTypeComponent.relationType) return false;
        if (!this.editPersonComponent.relationTypeComponent.relationType.confirmationDocument) return true;

        return (() => {
          if (!this.editPersonComponent.confirmationDocuments) return false;
          let component = this.editPersonComponent.confirmationDocuments.find(x => x.type == AttachmentType.ParentRepresentChildren);
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
      let parent = this.commonService.buildParent(this.editPersonComponent, this.inquiry.applicantType);
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
