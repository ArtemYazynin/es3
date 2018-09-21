import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Subscription } from 'rxjs';
import { Applicant, ApplicantType, AttachmentType, CitizenshipService, CommonService, ConfirmationDocument, Country, Parent } from '../../../../../shared';
import { BirthInfoComponent } from '../../../../../shared/components/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../../../../shared/components/citizenship-select/citizenship-select.component';
import { ConfirmationDocumentComponent } from '../../../../../shared/components/confirmation-document/confirmation-document.component';
import { ForeignCitizensAddressesComponent } from '../../../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { FullNameComponent } from '../../../../../shared/components/full-name/full-name.component';
import { IdentityCardComponent } from '../../../../../shared/components/identity-card/identity-card.component';
import { RelationTypeComponent } from '../../../../../shared/components/relation-type/relation-type.component';
import { RfCitizensAddressesComponent } from '../../../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { SnilsComponent } from '../../../../../shared/components/snils/snils.component';
import { WizardStorageService } from '../../../../wizard/shared';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditParentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RfCitizensAddressesComponent) rfAddressesComponent: RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignAddressesComponent: ForeignCitizensAddressesComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>;

  @Input() model: Parent | Applicant;
  @Input() modelType: ApplicantType;
  @Input() applicantType: ApplicantType;

  private subscription: Subscription;
  applicantTypes = ApplicantType;
  attachmentTypes = AttachmentType;
  groupOfIdentityCardTypeId: Array<number> = [];
  countries: Array<Country> = [];


  countryStateDocumentContext: ConfirmationDocumentContext;//templateOutlet params
  applicantRepresentParentDocumentContext: ConfirmationDocumentContext;
  parentRepresentChildrenDocumentContext: ConfirmationDocumentContext;

  constructor(private commonService: CommonService, private storageService: WizardStorageService, private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.subscription = this.citizenshipService.getCountries().subscribe(result => this.countries = result);
    switch (this.modelType) {
      case ApplicantType.Parent:
        this.groupOfIdentityCardTypeId = this.commonService.getParentDocumentTypes();
        this.countryStateDocumentContext = {
          $implicit: "",
          type: AttachmentType.CountryStateDocument,
          title: "Документ, подтверждающий право пребывания законного представителя на территории РФ",
          model: this.model ? this.model["countryStateDocument"] : undefined
        }
        this.parentRepresentChildrenDocumentContext = {
          $implicit: "",
          type: AttachmentType.ParentRepresentChildren,
          title: "Документ, подтверждающий право законного представителя представлять интересы ребенка",
          model: this.model ? this.model["parentRepresentChildrenDocument"] : undefined
        }
        break;
      case ApplicantType.Applicant:
        this.countryStateDocumentContext = {
          $implicit: "",
          type: AttachmentType.CountryStateApplicantDocument,
          title: "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ",
          model: this.model ? this.model["countryStateApplicantDocument"] : undefined
        }
        this.applicantRepresentParentDocumentContext = {
          $implicit: "",
          type: AttachmentType.ApplicantRepresentParent,
          title: "Документ, подтверждающий полномочие доверенного лица представлять интересы законного представителя ребенка",
          model: this.model ? this.model["applicantRepresentParentDocument"] : undefined
        }
        break;
      default:
        break;
    }
  }

  ngAfterViewInit(): void {
    this.isAvailable.childApplicantInfo = this.modelType === ApplicantType.Child;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isAvailable = (() => {
    const hasForeignCitizenship = () => {
      return this.citizenshipSelectComponent && this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries);
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
      const hasCitizenships = this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.length > 0;
      const permissibleModel = this.applicantType == ApplicantType.Applicant && this.modelType == ApplicantType.Applicant;
      return permissibleModel && hasCitizenships;
    }
    return {
      addresses: addresses,
      hasRfCitizenship: hasRfCitizenship,
      countryStateDocument: hasForeignCitizenship,
      parentRepresentChildren: parentRepresentChildren,
      childApplicantInfo: false,
    }
  })();
}

interface ConfirmationDocumentContext {
  $implicit: string;
  type: AttachmentType;
  title: string;
  model: ConfirmationDocument
}