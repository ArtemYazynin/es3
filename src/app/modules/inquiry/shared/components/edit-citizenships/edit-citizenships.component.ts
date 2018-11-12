import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { AttachmentType, Parent, Applicant, Child, CitizenshipService, ApplicantType, Country, ConfirmationDocument, PersonWithAddress } from '../../../../../shared';
import { CitizenshipSelectComponent } from '../../../../../shared/components/citizenship-select/citizenship-select.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RfCitizensAddressesComponent } from '../../../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { ForeignCitizensAddressesComponent } from '../../../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { EditConfirmationDocumentComponent } from '../../../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';
import { PersonType } from '../../../../../shared/person-type.enum';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-edit-citizenships',
  templateUrl: './edit-citizenships.component.html',
  styleUrls: ['./edit-citizenships.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCitizenshipsComponent implements OnInit, OnDestroy {
  @Input() model: Parent | Applicant | Child;
  @Input() personType: PersonType;
  @Input() applicantType: ApplicantType;

  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RfCitizensAddressesComponent) rfCitizensAddressesComponent: RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignCitizensAddressesComponent: ForeignCitizensAddressesComponent;
  @ViewChild(EditConfirmationDocumentComponent) editConfirmationDocumentComponent: EditConfirmationDocumentComponent;

  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country>
  documentConfig: any;
  personTypes = PersonType;
  constructor(private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(countries => {
        this.countries = countries;
      });
    if (this.personType == PersonType.Child) return;
    this.documentConfig = {
      title: this.personType == PersonType.Parent
        ? "Документ, подтверждающий право пребывания законного представителя на территории РФ"
        : "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ",
      type: this.personType == PersonType.Parent ? AttachmentType.CountryStateDocument : AttachmentType.CountryStateApplicantDocument,
      model: this.personType == PersonType.Parent
        ? this.model ? this.model["countryStateDocument"] : undefined
        : this.model ? this.model["countryStateApplicantDocument"] : undefined
    }
  }
  //"Документ, подтверждающий полномочие доверенного лица представлять интересы законного представителя ребенка"
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  isAvailable = {
    hasForeignCitizenship: () => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.hasForeignCitizenship();
    },
    hasRfCitizenship: () => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.hasRfCitizenship();
    },
    addresses: () => {
      const hasCitizenships = this.citizenshipSelectComponent.citizenships.length > 0;
      return hasCitizenships && ((this.applicantType == ApplicantType.Applicant && this.personType == PersonType.Applicant) || (this.applicantType == ApplicantType.Parent && this.personType == PersonType.Parent))
    },
    hasCitizenships: () => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.length > 0;
    }
  }

  isValid(): boolean {
    const hasCitizenships = this.citizenshipSelectComponent.citizenships.length > 0;
    const editChildren = this.personType == PersonType.Child && isNullOrUndefined(this.applicantType);
    if (editChildren) {
      return hasCitizenships;
    }
    const editParent = this.applicantType == ApplicantType.Applicant && this.personType == PersonType.Parent;
    if (this.isAvailable.hasRfCitizenship()) {
      return editParent
        ? hasCitizenships
        : this.rfCitizensAddressesComponent && this.rfCitizensAddressesComponent.checkboxesForm.valid;
    } else if (this.isAvailable.hasForeignCitizenship()) {
      const isValidDocument = this.editConfirmationDocumentComponent && this.editConfirmationDocumentComponent.confirmationDocumentForm.valid;
      return editParent
        ? hasCitizenships && isValidDocument
        : this.foreignCitizensAddressesComponent && this.foreignCitizensAddressesComponent.form.valid && isValidDocument
    }
    return false;
  }

  getResult(): { citizenships: number[], document: ConfirmationDocument, addresses: PersonWithAddress } {
    let result = {
      citizenships: this.citizenshipSelectComponent.citizenships,
      document: this.editConfirmationDocumentComponent ? this.editConfirmationDocumentComponent.getResult() : undefined,
      addresses: undefined
    }
    if (this.personType == PersonType.Parent && this.applicantType == ApplicantType.Applicant) {
      return result;
    }
    result.addresses = this.citizenshipSelectComponent.hasRfCitizenship()
      ? this.rfCitizensAddressesComponent.getResult()
      : this.foreignCitizensAddressesComponent.getResult()
    return result;

  }
}
