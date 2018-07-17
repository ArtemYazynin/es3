import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { CitizenshipService, Country, WizardStorageService, ApplicantType, AttachmentType, StepBase } from '../../shared/index';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css']
})
export class ApplicantStepComponent implements OnInit, StepBase {
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;

  constructor(private citizenshipService: CitizenshipService, private router: Router,
    private activatedRoute: ActivatedRoute, private storageService: WizardStorageService) { }

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
      if (this.storageService.request.applicantType == ApplicantType["Законный представитель ребенка"]) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../parentStep"], { relativeTo: this.activatedRoute });
      }
    }
  }
}
