import { Component, OnInit, QueryList, ViewChild, ViewChildren, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { SnilsComponent } from '../../person/snils/snils.component';
import { Applicant, ApplicantType, AttachmentType, CitizenshipService, CommonService, CompilationOfWizardSteps, Country, IdentityCard, StepBase, WizardStorageService, ConfirmationDocument } from '../../shared';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css']
})
export class ApplicantStepComponent implements OnInit, AfterViewInit, StepBase {

  ngAfterViewInit(): void {
    if(!this.compilationOfWizardSteps.applicant) return;
    this.initDocument(AttachmentType.ApplicantRepresentParent, this.compilationOfWizardSteps.applicant.applicantRepresentParentDocument, "Документ, подтверждающий полномочие доверенного лица представлять интересы законного представителя ребенка");
    this.initDocument(AttachmentType.CountryStateApplicantDocument, this.compilationOfWizardSteps.applicant.countryStateApplicantDocument, "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ");
    this.cdr.detectChanges();
  }
  inquiryType: string;
  private compilationOfWizardSteps: CompilationOfWizardSteps;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;

  constructor(private citizenshipService: CitizenshipService, private router: Router,
    private activatedRoute: ActivatedRoute, private storageService: WizardStorageService,
    private commonService: CommonService,private cdr: ChangeDetectorRef) { }

  attachmentTypes = AttachmentType;
  countries: Array<Country> = [];
  isAvailable = {
    countryStateDocument: () => this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries)
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
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) this.inquiryType = params["type"];
    });
    this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
      });

    this.compilationOfWizardSteps = <CompilationOfWizardSteps>this.storageService.get(this.inquiryType);
    if (!this.compilationOfWizardSteps || !this.compilationOfWizardSteps.applicant) return;
    this.snilsComponent.snils = this.compilationOfWizardSteps.applicant.snils;
    this.citizenshipSelectComponent.citizenships = this.compilationOfWizardSteps.applicant.citizenships;
    if (!this.compilationOfWizardSteps || !this.compilationOfWizardSteps.applicant) return;
    this.fullnameComponent.fullnameForm.patchValue({
      lastname: this.compilationOfWizardSteps.applicant.lastname,
      firstname: this.compilationOfWizardSteps.applicant.firstname,
      middlename: this.compilationOfWizardSteps.applicant.middlename,
      noMiddlename: this.compilationOfWizardSteps.applicant.noMiddlename
    });
    this.identityCardComponent.identityCardForm.patchValue({
      identityCardType: this.compilationOfWizardSteps.applicant.identityCard.identityCardType,
      name: this.compilationOfWizardSteps.applicant.identityCard.name,
      series: this.compilationOfWizardSteps.applicant.identityCard.series,
      number: this.compilationOfWizardSteps.applicant.identityCard.number,
      issued: this.compilationOfWizardSteps.applicant.identityCard.issued,
      dateIssue: this.compilationOfWizardSteps.applicant.identityCard.dateIssue,
      dateExpired: this.compilationOfWizardSteps.applicant.identityCard.dateExpired,
      issueDepartmentCode: this.compilationOfWizardSteps.applicant.identityCard.issueDepartmentCode,
      actRecordNumber: this.compilationOfWizardSteps.applicant.identityCard.actRecordNumber,
      actRecordDate: this.compilationOfWizardSteps.applicant.identityCard.actRecordDate,
      actRecordPlace: this.compilationOfWizardSteps.applicant.identityCard.actRecordPlace,
    });
  }
  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.activatedRoute });
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
        result.countryStateApplicantDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.CountryStateApplicantDocument);
        result.applicantRepresentParentDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.ApplicantRepresentParent);
        return result;
      })();
      this.storageService.set(this.inquiryType, { applicant: applicant });
      if (this.storageService.get(this.inquiryType).applicantType == ApplicantType["Законный представитель ребенка"]) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../parentStep"], { relativeTo: this.activatedRoute });
      }
    }
  }
  private initDocument(attachmentType: AttachmentType, document: ConfirmationDocument, errorMessage: string) {
    try {
      const documentComponent = this.confirmationDocuments.find(x => x.type == attachmentType);
      documentComponent.confirmationDocumentForm.patchValue({
        name: document.name,
        series: document.series,
        number: document.number,
        dateIssue: document.dateIssue,
        dateExpired: document.dateExpired,
      });
    } catch (error) {
      console.log(errorMessage + "\r\n", "Ошибка обновления формы", error.name);
    }
  }
}
