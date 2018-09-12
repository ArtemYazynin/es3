import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CitizenshipSelectComponent } from '../../../shared/components/citizenship-select/citizenship-select.component';
import { ConfirmationDocumentComponent } from '../../../shared/components/confirmation-document/confirmation-document.component';
import { ForeignCitizensAddressesComponent } from '../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { FullNameComponent } from '../../../shared/components/full-name/full-name.component';
import { IdentityCardComponent } from '../../../shared/components/identity-card/identity-card.component';
import { RfCitizensAddressesComponent } from '../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { SnilsComponent } from '../../../shared/components/snils/snils.component';
import { addressTypes, Applicant, ApplicantType, AttachmentType, CitizenshipService, CommonService, Country, DublicatesFinder, FormService, IdentityCard } from '../../../shared/index';
import { Inquiry, StepBase, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css']
})
export class ApplicantStepComponent implements OnInit, AfterViewInit, OnDestroy, StepBase {
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (!this.inquiry.applicant) return;
    this.formService.patchDocumentForm(this.confirmationDocuments.find(x => x.type == AttachmentType.ApplicantRepresentParent).confirmationDocumentForm,
      this.inquiry.applicant.applicantRepresentParentDocument);

    this.formService.patchDocumentForm(this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateApplicantDocument).confirmationDocumentForm,
      this.inquiry.applicant.countryStateApplicantDocument);

    this.cdr.detectChanges();
  }

  private inquiry: Inquiry;
  private subscription: Subscription;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RfCitizensAddressesComponent) rfAddressesComponent: RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignAddressesComponent: ForeignCitizensAddressesComponent;

  constructor(private citizenshipService: CitizenshipService, private router: Router,
    private route: ActivatedRoute, private storageService: WizardStorageService,
    private commonService: CommonService, private cdr: ChangeDetectorRef, private formService: FormService) { }

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  attachmentTypes = AttachmentType;
  addressTypes = addressTypes;

  countries: Array<Country> = [];
  isAvailable = {
    hasRfCitizenship: () => this.citizenshipSelectComponent.citizenships.indexOf(643) >= 0,
    countryStateDocument: () => this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries),
    addresses: () => this.citizenshipSelectComponent.citizenships.length > 0 && this.inquiry.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]
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
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries);
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
    this.subscription = this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
      });

    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    if (!this.inquiry || !this.inquiry.applicant) return;
    this.snilsComponent.snils = this.inquiry.applicant.snils;
    this.citizenshipSelectComponent.citizenships = this.inquiry.applicant.citizenships;
    if (!this.inquiry || !this.inquiry.applicant) return;
    this.formService.patchFullnameForm(this.fullnameComponent.fullnameForm, this.inquiry.applicant);
    this.formService.patchIdentityCardForm(this.identityCardComponent.identityCardForm, this.inquiry.applicant.identityCard);

  }
  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
    },
    next: () => {
      let applicant = (() => {
        let result = new Applicant(this.fullnameComponent.fullnameForm.controls.lastname.value,
          this.fullnameComponent.fullnameForm.controls.firstname.value,
          this.fullnameComponent.fullnameForm.controls.middlename.value,
          this.snilsComponent.snils,
          this.fullnameComponent.fullnameForm.controls.noMiddlename.value,
          null, null, null);
        result.identityCard = new IdentityCard(this.identityCardComponent.identityCardForm);
        result.citizenships = this.citizenshipSelectComponent.citizenships;

        if (this.citizenshipService.hasForeignCitizenship(result.citizenships, this.countries)) {
          result.countryStateApplicantDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.CountryStateApplicantDocument);
        }
        result.applicantRepresentParentDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.ApplicantRepresentParent);

        if (this.inquiry.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]) {
          //--addresses
          Object.assign(result, this.citizenshipService.hasRfCitizenship(result.citizenships, this.countries)
            ? this.rfAddressesComponent.getResult(this.inquiry.parent)
            : this.foreignAddressesComponent.getResult(this.inquiry.parent));
          //--
        }

        return result;
      })();

      if (DublicatesFinder.betweenApplicantChildren(applicant, this.inquiry.children)) return;
      if (DublicatesFinder.betweenChildren(this.inquiry.children)) return;

      this.storageService.set(this.inquiryType, { applicant: applicant });
      if (this.inquiry.applicantType == ApplicantType["Законный представитель ребенка"]) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../parentStep"], { relativeTo: this.route });
      }
    }
  }
}