import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StepBase, WizardStorageService } from '../shared';
import { GenderComponent } from '../../../shared/components/gender/gender.component';
import { SnilsComponent } from '../../../shared/components/snils/snils.component';
import { IdentityCardComponent } from '../../../shared/components/identity-card/identity-card.component';
import { FullNameComponent } from '../../../shared/components/full-name/full-name.component';
import { BirthInfoComponent } from '../../../shared/components/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../../shared/components/citizenship-select/citizenship-select.component';
import { RelationTypeComponent } from '../../../shared/components/relation-type/relation-type.component';
import { ConfirmationDocumentComponent } from '../../../shared/components/confirmation-document/confirmation-document.component';
import { RfCitizensAddressesComponent } from '../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { ForeignCitizensAddressesComponent } from '../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { ApplicantType, AttachmentType, IdentityCardType, Country, inquiryType, addressTypes, CommonService, FormService, CitizenshipService, Parent, IdentityCard, DublicatesFinder, Inquiry } from '../../../shared';


@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit, AfterViewInit, OnDestroy, StepBase {
  @ViewChild(GenderComponent) gendercomponent: GenderComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>;
  @ViewChild(RfCitizensAddressesComponent) rfAddressesComponent: RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignAddressesComponent: ForeignCitizensAddressesComponent;

  private subscription: Subscription;


  inquiry: Inquiry;
  applicantType: ApplicantType;
  attachmentTypes = AttachmentType;
  agree: boolean = false;
  groupOfIdentityCardTypeId: Array<number> = [
    IdentityCardType["Паспорт РФ"],
    IdentityCardType["Другой документ, удостоверяющий личность"],
    IdentityCardType["Свидетельство о рождении РФ"],
    IdentityCardType["Загранпаспорт гражданина РФ"],
    IdentityCardType["Удостоверение офицера"],
    IdentityCardType["Военный билет"],
    IdentityCardType["Временное удостоверение, выданное взамен военного билета"],
    IdentityCardType["Временное удостоверение личности гражданина РФ"],
    IdentityCardType["Иностранный паспорт"],
    IdentityCardType["Удостоверение личности лица без гражданства в РФ"],
    IdentityCardType["Удостоверение личности отдельных категорий лиц, находящихся на территории РФ,подавших заявление о признании гражданами РФ или о приеме в гражданство РФ"],
    IdentityCardType["Удостоверение беженца"],
    IdentityCardType["Удостоверение личности лица, ходатайствующего о признании беженцем на территории РФ"],
    IdentityCardType["Удостоверение личности лица, получившего временное убежище на территории РФ"],
    IdentityCardType["Вид на жительство"],
    IdentityCardType["Разрешение на временное проживание в РФ"],
    IdentityCardType["Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории РФ по существу"],
    IdentityCardType["Свидетельство о предоставлении временного убежища на территории Российской Федерации"],
    IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"]
  ];
  countries: Array<Country> = [];
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiryTypes = inquiryType;
  addressTypes = addressTypes;

  constructor(private storageService: WizardStorageService, private commonService: CommonService, private formService: FormService,
    private citizenshipService: CitizenshipService, private cdr: ChangeDetectorRef,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.subscription = this.citizenshipService.getCountries().subscribe(result => this.countries = result);
    this.applicantType = this.storageService.get(this.inquiryType).applicantType;
    this.isAvailable.childApplicantInfo = this.applicantType === ApplicantType["Ребенок-заявитель"];

    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    if (!this.inquiry || !this.inquiry.parent) return;
    this.agree = true;
    this.snilsComponent.snils = this.inquiry.parent.snils;
    this.citizenshipSelectComponent.citizenships = this.inquiry.parent.citizenships;
    this.formService.patchFullnameForm(this.fullnameComponent.fullnameForm, this.inquiry.parent);
    this.formService.patchIdentityCardForm(this.identityCardComponent.identityCardForm, this.inquiry.parent.identityCard);
    this.gendercomponent.gender = this.inquiry.parent.gender;
    if (this.birthInfoComponent.birthInfoForm) {
      this.birthInfoComponent.birthInfoForm.patchValue({
        birthDate: this.inquiry.parent.birthDate,
        birthPlace: this.inquiry.parent.birthPlace
      });
    }
    this.relationTypeComponent.relationType = this.inquiry.parent.relationType;
  }
  ngAfterViewInit(): void {
    if (!this.inquiry.parent) return;

    this.formService.patchDocumentForm(this.confirmationDocuments.find(x => x.type == AttachmentType.ParentRepresentChildren).confirmationDocumentForm,
      this.inquiry.parent.parentRepresentChildrenDocument);

    this.formService.patchDocumentForm(this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateDocument).confirmationDocumentForm,
      this.inquiry.parent.countryStateDocument);
    this.cdr.detectChanges();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  isValid(): boolean {
    let isValid = {
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: (() => {
        if (this.applicantType !== ApplicantType["Ребенок-заявитель"])
          return true;
        return this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false;
      })(),
      countryStateForm: (() => {
        if (!this.citizenshipSelectComponent || this.citizenshipSelectComponent.citizenships.length == 0) return false;
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries);
        if (!hasForeignCitizenship) return true;

        return (() => {
          if (!this.confirmationDocuments) return false;
          let component = this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateDocument);
          return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
        })();
      })(),
      relationType: (() => {
        if (!this.relationTypeComponent || !this.relationTypeComponent.relationType) return false;
        if (!this.relationTypeComponent.relationType.confirmationDocument) return true;

        return (() => {
          if (!this.confirmationDocuments) return false;
          let component = this.confirmationDocuments.find(x => x.type == AttachmentType.ParentRepresentChildren);
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
  isAvailable = (() => {
    const hasForeignCitizenship = () => {
      return this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries);
    }
    const hasRfCitizenship = () => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.indexOf(643) >= 0;
    }
    const parentRepresentChildren = () => {
      return this.relationTypeComponent
        && this.relationTypeComponent.relationType
        && this.relationTypeComponent.relationType.confirmationDocument;
    };
    const addresses = () => {
      return this.citizenshipSelectComponent.citizenships.length > 0 && this.inquiry.applicantType == ApplicantType["Законный представитель ребенка"];
    }
    return {
      addresses: addresses,
      hasRfCitizenship: hasRfCitizenship,
      countryStateDocument: hasForeignCitizenship,
      parentRepresentChildren: parentRepresentChildren,
      childApplicantInfo: false
    }
  })();

  goTo = {
    back: () => {
      if (this.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]) {
        this.router.navigate(["../applicantStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      }
    },
    next: () => {
      let parent = (() => {
        let birthInfo = (() => {
          if (!this.birthInfoComponent) return {};
          return {
            birthDate: this.birthInfoComponent.birthInfoForm.controls.birthDate.value,
            birthPlace: this.birthInfoComponent.birthInfoForm.controls.birthPlace.value
          }
        })();
        let result = new Parent(this.fullnameComponent.fullnameForm.controls.lastname.value,
          this.fullnameComponent.fullnameForm.controls.firstname.value,
          this.fullnameComponent.fullnameForm.controls.middlename.value,
          this.snilsComponent.snils,
          this.fullnameComponent.fullnameForm.controls.noMiddlename.value,
          birthInfo.birthDate,
          birthInfo.birthPlace,
          this.gendercomponent.gender);
        result.identityCard = new IdentityCard(this.identityCardComponent.identityCardForm);
        result.citizenships = this.citizenshipSelectComponent.citizenships;

        if (this.citizenshipService.hasForeignCitizenship(result.citizenships, this.countries)) {
          result.countryStateDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.CountryStateDocument);
        }

        result.relationType = this.relationTypeComponent.relationType;
        if (result.relationType.confirmationDocument)
          result.parentRepresentChildrenDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.ParentRepresentChildren);

        if (this.inquiry.applicantType == ApplicantType["Законный представитель ребенка"]) {
          Object.assign(result, this.citizenshipService.hasRfCitizenship(result.citizenships, this.countries)
            ? this.rfAddressesComponent.getResult(this.inquiry.parent)
            : this.foreignAddressesComponent.getResult(this.inquiry.parent));
        }
        return result;
      })();

      if (this.inquiry.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]) {
        if (DublicatesFinder.betweenApplicantParent(this.inquiry.applicant, parent)) return;
        if (DublicatesFinder.betweenApplicantChildren(this.inquiry.applicant, this.inquiry.children)) return;
        if (DublicatesFinder.betweenParentChildren(parent, this.inquiry.children)) return;
      } else if (this.inquiry.applicantType == ApplicantType["Законный представитель ребенка"]) {
        if (DublicatesFinder.betweenParentChildren(parent, this.inquiry.children)) return;
      }


      this.storageService.set(this.inquiryType, { parent: parent });
      this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
    }
  }
}
