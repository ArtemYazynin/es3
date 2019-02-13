import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Applicant, ApplicantType, AttachmentType, Child, ConfirmationDocument, Parent, PersonWithAddress } from '../../../../../shared';
import { CitizenshipSelectComponent } from '../../../../../shared/components/citizenship-select/citizenship-select.component';
import { EditConfirmationDocumentComponent } from '../../../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';
import { ForeignCitizensAddressesComponent } from '../../../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { RfCitizensAddressesComponent } from '../../../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { PersonType } from '../../../../../shared/person-type.enum';

@Component({
  selector: 'app-edit-citizenships',
  templateUrl: './edit-citizenships.component.html',
  styleUrls: ['./edit-citizenships.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'host' }
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
  documentConfig: any;
  personTypes = PersonType;
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
  constructor() { }

  ngOnInit() {
    if (this.personType == PersonType.Child) return;
    this.documentConfig = this.getConfig();
  }

  private getConfig() {
    return {
      title: this.personType == PersonType.Parent
        ? "Документ, подтверждающий право пребывания законного представителя на территории РФ"
        : "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ",
      type: this.personType == PersonType.Parent ? AttachmentType.CountryStateDocument : AttachmentType.CountryStateApplicantDocument,
      model: this.personType == PersonType.Parent
        ? this.model ? this.model["countryStateDocument"] : undefined
        : this.model ? this.model["countryStateApplicantDocument"] : undefined
    };
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }


  isValid(): boolean {
    const hasCitizenships = this.citizenshipSelectComponent.citizenships.length > 0;
    switch (this.personType) {
      case PersonType.Child:
        return hasCitizenships;
      default:
        const isParent = this.applicantType == ApplicantType.Applicant && this.personType == PersonType.Parent;
        if (this.isAvailable.hasRfCitizenship()) {
          return isParent
            ? hasCitizenships
            : this.isValidForm(this.rfCitizensAddressesComponent);
        }
        if (this.isAvailable.hasForeignCitizenship()) {
          const isValidDocument = this.isValidForm(this.editConfirmationDocumentComponent);
          const isValidAddress = this.isValidForm(this.foreignCitizensAddressesComponent);
          return isParent
            ? hasCitizenships && isValidDocument
            : isValidAddress && isValidDocument;
        }
        return false;
    }
  }

  private isValidForm(component: { form: FormGroup }) {
    return component && component.form.valid;
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
