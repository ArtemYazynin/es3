import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullNameComponent } from '../../../../../shared/components/full-name/full-name.component';
import { GenderComponent } from '../../../../../shared/components/gender/gender.component';
import { IdentityCardComponent } from '../../../../../shared/components/identity-card/identity-card.component';
import { RelationTypeComponent } from '../../../../../shared/components/relation-type/relation-type.component';
import { SnilsComponent } from '../../../../../shared/components/snils/snils.component';
import { Applicant, ApplicantType, AttachmentType, CitizenshipService, CommonService, ConfirmationDocument, Country, IdentityCardType, Parent } from '../../../../../shared/index';
import { PersonType } from '../../../../../shared/person-type.enum';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
  styleUrls: ['./edit-person.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonComponent implements OnInit, OnDestroy {
  //@ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(GenderComponent) genderComponent:GenderComponent;

  @Input() model: Parent | Applicant;
  @Input() personType: PersonType;

  private subscription: Subscription;
  applicantTypes = ApplicantType;
  attachmentTypes = AttachmentType;
  personTypes = PersonType;
  groupOfIdentityCardTypeId: Array<number> = [];
  countries: Array<Country> = [];


  countryStateDocumentContext: ConfirmationDocumentContext;//templateOutlet params
  applicantRepresentParentDocumentContext: ConfirmationDocumentContext;
  parentRepresentChildrenDocumentContext: ConfirmationDocumentContext;

  constructor(private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.subscription = this.citizenshipService.getCountries().subscribe(result => this.countries = result);
    switch (this.personType) {
      case PersonType.Child:
        this.groupOfIdentityCardTypeId = [
          IdentityCardType["Паспорт РФ"],
          IdentityCardType["Свидетельство о рождении РФ"],
          IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"],
          IdentityCardType["Иностранный паспорт"]
        ];
        break;
    
      default:
        break;
    }
    // switch (this.modelType) {
    //   case ApplicantType.Parent:
    //     this.groupOfIdentityCardTypeId = this.commonService.getParentDocumentTypes();
    //     this.countryStateDocumentContext = {
    //       $implicit: "",
    //       type: AttachmentType.CountryStateDocument,
    //       title: "Документ, подтверждающий право пребывания законного представителя на территории РФ",
    //       model: this.model ? this.model["countryStateDocument"] : undefined
    //     }
    //     this.parentRepresentChildrenDocumentContext = {
    //       $implicit: "",
    //       type: AttachmentType.ParentRepresentChildren,
    //       title: "Документ, подтверждающий право законного представителя представлять интересы ребенка",
    //       model: this.model ? this.model["parentRepresentChildrenDocument"] : undefined
    //     }
    //     break;
    //   case ApplicantType.Applicant:
    //     this.countryStateDocumentContext = {
    //       $implicit: "",
    //       type: AttachmentType.CountryStateApplicantDocument,
    //       title: "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ",
    //       model: this.model ? this.model["countryStateApplicantDocument"] : undefined
    //     }
    //     this.applicantRepresentParentDocumentContext = {
    //       $implicit: "",
    //       type: AttachmentType.ApplicantRepresentParent,
    //       title: "Документ, подтверждающий полномочие доверенного лица представлять интересы законного представителя ребенка",
    //       model: this.model ? this.model["applicantRepresentParentDocument"] : undefined
    //     }
    //     break;
    //   default:
    //     break;
    // }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  isValid(): boolean {
    //const isApplicant = this.applicantType == ApplicantType.Applicant && this.modelType == ApplicantType.Applicant;
    let isValid = {
      identityCardForm: !!this.identityCardComponent && !!this.identityCardComponent.identityCardForm && this.identityCardComponent.identityCardForm.valid,
      fullnameForm: !!this.fullnameComponent && !!this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid,
      // birthInfoForm: () => {
      //   if (this.applicantType !== ApplicantType.Child) return true;
      //   return !!this.birthInfoComponent && !!this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid;
      // },
      // countryStateDocument: () => {
      //   if (this.modelType != ApplicantType.Parent) return true;
      //   if (!this.citizenshipSelectComponent || this.citizenshipSelectComponent.citizenships.length == 0) return false;
      //   if (!this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries)) return true;
      //   let component = this.confirmationDocuments
      //     ? this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateDocument)
      //     : undefined;
      //   return !!component && !!component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
      // },
      // relationType: () => {
      //   if (this.applicantType != ApplicantType.Parent) return true;
      //   if (!this.relationTypeComponent || !this.relationTypeComponent.relationType) return false;
      //   if (!this.relationTypeComponent.relationType.confirmationDocument) return true;

      //   let component = !!this.confirmationDocuments
      //     ? this.confirmationDocuments.find(x => x.type == AttachmentType.ParentRepresentChildren)
      //     : undefined;
      //   return !!component && !!component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
      // },
      // countryStateApplicantDocument: () => {
      //   const hasCitizenships = !!this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.length > 0;
      //   if (!isApplicant) return true;
      //   if (!hasCitizenships) return false;
      //   if (!this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries)) return true;
      //   let component = this.confirmationDocuments
      //     ? this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateApplicantDocument)
      //     : undefined;
      //   return !!component && !!component.confirmationDocumentForm && component.confirmationDocumentForm.valid;
      // },
      // applicantRepresentParentDocument: () => {
      //   if (!isApplicant) return true;
      //   let component = this.confirmationDocuments.find(x => x.type == AttachmentType.ApplicantRepresentParent);
      //   return !!component && !!component.confirmationDocumentForm && component.confirmationDocumentForm.valid
      // }
    }

    let result = isValid.fullnameForm
      && this.snilsComponent.isValid()
      && isValid.identityCardForm
    return result;
  }
}

interface ConfirmationDocumentContext {
  $implicit: string;
  type: AttachmentType;
  title: string;
  model: ConfirmationDocument
}