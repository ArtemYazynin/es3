import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CitizenshipService, Country, WizardStorageService, ApplicantType, AttachmentType, StepBase, Applicant, Person, IdentityCard, CommonService } from '../../shared/index';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';
import { SnilsComponent } from '../../person/snils/snils.component';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css']
})
export class ApplicantStepComponent implements OnInit, StepBase {
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;

  constructor(private citizenshipService: CitizenshipService, private router: Router,
    private activatedRoute: ActivatedRoute, private storageService: WizardStorageService,
    private commonService: CommonService) { }

  attachmentTypes = AttachmentType;
  countries: Array<Country> = [];
  isAvailable = {
    countryStateDocument: () => this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent, this.countries)
  }
  isValid(): boolean {
    if (!this.confirmationDocuments) return false;
    let isValid = {
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      countryStateDocumentForm: (() => {
        if (!this.citizenshipSelectComponent || this.citizenshipSelectComponent.citizenships.length == 0) return false;
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent, this.countries);
        if (!hasForeignCitizenship) return true;

        return (() => {
          if (!this.confirmationDocuments) return false;
          let component = this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateApplicantDocument);
          return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
        })();
      })(),
      applicantRepresentDocumentForm: (() => {
        let component = this.confirmationDocuments.find(x => x.type == AttachmentType.ApplicantRepresentParent);
        return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid
      })()
    }
    return isValid.fullnameForm
      && isValid.identityCardForm
      && isValid.countryStateDocumentForm
      && isValid.applicantRepresentDocumentForm;
  }

  ngOnInit() {

    this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
      });
  }
  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {
      let applicant = (() => {
        let result = new Applicant();
        result.person = new Person(this.fullnameComponent.fullnameForm.controls.lastname.value,
          this.fullnameComponent.fullnameForm.controls.firstname.value,
          this.fullnameComponent.fullnameForm.controls.middlename.value,
          this.snilsComponent.snils,
          this.fullnameComponent.fullnameForm.controls.noMiddlename.value,
          null, null, null);
        result.IdentityCard = new IdentityCard(this.identityCardComponent.identityCardForm);
        result.citizenships = this.citizenshipSelectComponent.citizenships;
        result.countryStateApplicantDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.CountryStateApplicantDocument);
        result.applicantRepresentParentDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.ApplicantRepresentParent);
        return result;
      })();
      this.storageService.applicant = applicant;
      if (this.storageService.request.applicantType == ApplicantType["Законный представитель ребенка"]) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../parentStep"], { relativeTo: this.activatedRoute });
      }
    }
  }
}
