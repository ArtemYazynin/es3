import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren, ChangeDetectionStrategy, Input, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ApplicantType, AttachmentType, CitizenshipService, CommonService, Country, Inquiry } from '../../../../../shared';
import { CitizenshipSelectComponent } from '../../../../../shared/components/citizenship-select/citizenship-select.component';
import { ConfirmationDocumentComponent } from '../../../../../shared/components/confirmation-document/confirmation-document.component';
import { ForeignCitizensAddressesComponent } from '../../../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { FullNameComponent } from '../../../../../shared/components/full-name/full-name.component';
import { GenderComponent } from '../../../../../shared/components/gender/gender.component';
import { IdentityCardComponent } from '../../../../../shared/components/identity-card/identity-card.component';
import { RelationTypeComponent } from '../../../../../shared/components/relation-type/relation-type.component';
import { RfCitizensAddressesComponent } from '../../../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { SnilsComponent } from '../../../../../shared/components/snils/snils.component';
import { WizardStorageService } from '../../../../wizard/shared';
import { BirthInfoComponent } from '../../../../../shared/components/birth-info/birth-info.component';

@Component({
  selector: 'app-edit-parent',
  templateUrl: './edit-parent.component.html',
  styleUrls: ['./edit-parent.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditParentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(BirthInfoComponent) birthInfoComponent:BirthInfoComponent;
  @ViewChild(GenderComponent) gendercomponent: GenderComponent;
  @ViewChild(SnilsComponent) snilsComponent: SnilsComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RfCitizensAddressesComponent) rfAddressesComponent: RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignAddressesComponent: ForeignCitizensAddressesComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;
  @ViewChildren(ConfirmationDocumentComponent) confirmationDocuments: QueryList<ConfirmationDocumentComponent>;

  @Input() inquiry: Inquiry;

  private subscription: Subscription;
  attachmentTypes = AttachmentType;
  groupOfIdentityCardTypeId: Array<number>;
  countries: Array<Country> = [];
  constructor(private commonService: CommonService, private storageService: WizardStorageService, private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.groupOfIdentityCardTypeId = this.commonService.getParentDocumentTypes();
    this.subscription = this.citizenshipService.getCountries().subscribe(result => this.countries = result);
  }

  ngAfterViewInit(): void {
    this.isAvailable.childApplicantInfo = this.inquiry.applicantType === ApplicantType.Child;
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
    const addresses = (applicantType: ApplicantType) => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.length > 0 && applicantType == ApplicantType.Parent;
    }
    const relationType = (applicantType: ApplicantType) => {
      return applicantType != ApplicantType.Child;
    }
    return {
      addresses: addresses,
      hasRfCitizenship: hasRfCitizenship,
      countryStateDocument: hasForeignCitizenship,
      parentRepresentChildren: parentRepresentChildren,
      childApplicantInfo: false,
      relationType: relationType
    }
  })();
}
