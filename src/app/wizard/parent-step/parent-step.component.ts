import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  IdentityCardType,
  CitizenshipService,
  ApplicantType,
  Country,
  WizardStorageService,
  Entity,
  AttachmentType,
  StepBase,
  Parent,
  Person,
  IdentityCard,
  CommonService
} from "../../shared/index";
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { BirthInfoComponent } from '../../person/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';
import { RelationTypeComponent } from '../../relation-type/relation-type.component';
import { SnilsComponent } from '../../person/snils/snils.component';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit, StepBase {
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>

  applicantType: ApplicantType;
  attachmentTypes = AttachmentType;
  agree: boolean = false;
  citships: Array<Entity<string>> = [];
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
  inquiryType: string;
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
        let hasForeignCitizenship = this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent, this.countries);
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
  isAvailable = {
    countryStateDocument: () => this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent, this.countries),
    parentRepresentChildren: () => {
      return this.relationTypeComponent
        && this.relationTypeComponent.relationType
        && this.relationTypeComponent.relationType.confirmationDocument;
    },
    childApplicantInfo: false
  }

  constructor(private storageService: WizardStorageService, private commonService: CommonService,
    private citizenshipService: CitizenshipService,
    private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {


    this.citizenshipService.getCountries().subscribe(result => {
      this.countries = result;
    });

    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
        this.applicantType = this.storageService.get(this.inquiryType).applicantType;
        this.isAvailable.childApplicantInfo = this.applicantType === ApplicantType["Ребенок-заявитель"];
      }
    });
  }

  goTo = {
    back: () => {
      if (this.applicantType == ApplicantType["Доверенное лицо законного представителя ребенка"]) {
        this.router.navigate(["../applicantStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.activatedRoute });
      }
    },
    next: () => {
      let parent = (() => {
        let result = new Parent();
        let birthInfo = (() => {
          if (!this.birthInfoComponent) return {};
          return {
            birthDate: this.birthInfoComponent.birthInfoForm.controls.birthDate.value,
            birthPlace: this.birthInfoComponent.birthInfoForm.controls.birthPlace.value,
            gender: this.birthInfoComponent.birthInfoForm.controls.gender.value,
          }
        })();
        result.person = new Person(this.fullnameComponent.fullnameForm.controls.lastname.value,
          this.fullnameComponent.fullnameForm.controls.firstname.value,
          this.fullnameComponent.fullnameForm.controls.middlename.value,
          this.snilsComponent.snils,
          this.fullnameComponent.fullnameForm.controls.noMiddlename.value,
          birthInfo.birthDate,
          birthInfo.birthPlace,
          birthInfo.gender);
        result.IdentityCard = new IdentityCard(this.identityCardComponent.identityCardForm);
        result.citizenships = this.citizenshipSelectComponent.citizenships;
        result.countryStateDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.CountryStateDocument);
        result.relationType = this.relationTypeComponent.relationType;
        result.parentRepresentChildrenDocument = this.commonService.getDocumentByType(this.confirmationDocuments, AttachmentType.ParentRepresentChildren);
        return result;
      })();
      this.storageService.set(this.inquiryType, { parent: parent });
      this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
    }
  }
}
