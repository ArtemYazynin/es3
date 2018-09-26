import { Injectable, QueryList } from '@angular/core';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { ApplicantType } from './applicant-type.enum';
import { CitizenshipService } from './citizenship.service';
import { ConfirmationDocumentComponent } from './components/confirmation-document/confirmation-document.component';
import { Applicant } from './models/applicant';
import { AttachmentType } from './models/attachment-type.enum';
import { ConfirmationDocument } from './models/confirmation-document';
import { Entity } from './models/entity';
import { IdentityCard } from './models/identityCard';
import { IdentityCardType } from './models/identityCardType';
import { Parent } from './models/parent';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private citizenshipService: CitizenshipService) { }

  autoCompliteFilter<T extends Entity<string>>(collection: Array<T>, name: string): Array<T> {
    const filterValue = name.toLowerCase();
    return collection.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(entity?: Entity<string>): string | undefined {
    return entity ? entity.name : undefined;
  }


  getIeVersion() {
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : undefined;
  }
  getDocumentByType(components: QueryList<ConfirmationDocumentComponent> | Array<ConfirmationDocumentComponent>, type: AttachmentType) {
    let document = components.find(x => x.type == type);
    if (!document) return undefined
    return new ConfirmationDocument(document.confirmationDocumentForm.controls.name.value,
      document.confirmationDocumentForm.controls.series.value,
      document.confirmationDocumentForm.controls.number.value,
      document.confirmationDocumentForm.controls.dateIssue.value,
      document.confirmationDocumentForm.controls.dateExpired.value)
  }
  compareObjects(o1: any, o2: any): boolean {
    return (o1 && o1.id) === (o2 && o2.id);
  }

  getParentDocumentTypes(): Array<IdentityCardType> {
    return [
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
  }

  buildParent(editParentComponent: EditPersonComponent, applicantType: ApplicantType): Parent {
    let birthInfo = (() => {
      if (!editParentComponent.birthInfoComponent) return {};
      return {
        birthDate: editParentComponent.birthInfoComponent.birthInfoForm.controls.birthDate.value,
        birthPlace: editParentComponent.birthInfoComponent.birthInfoForm.controls.birthPlace.value
      }
    })();
    let result = new Parent(editParentComponent.fullnameComponent.fullnameForm.controls.lastname.value,
      editParentComponent.fullnameComponent.fullnameForm.controls.firstname.value,
      editParentComponent.fullnameComponent.fullnameForm.controls.middlename.value,
      editParentComponent.snilsComponent.snils,
      editParentComponent.fullnameComponent.fullnameForm.controls.noMiddlename.value,
      birthInfo.birthDate,
      birthInfo.birthPlace, 1);
    result.identityCard = new IdentityCard(editParentComponent.identityCardComponent.identityCardForm);
    result.citizenships = editParentComponent.citizenshipSelectComponent.citizenships;

    if (this.citizenshipService.hasForeignCitizenship(result.citizenships, editParentComponent.countries)) {
      result.countryStateDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.CountryStateDocument);
    }

    result.relationType = editParentComponent.relationTypeComponent.relationType;
    if (result.relationType.confirmationDocument)
      result.parentRepresentChildrenDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.ParentRepresentChildren);

    if (applicantType == ApplicantType.Parent) {
      Object.assign(result, this.citizenshipService.hasRfCitizenship(result.citizenships, editParentComponent.countries)
        ? editParentComponent.rfAddressesComponent.getResult()
        : editParentComponent.foreignAddressesComponent.getResult());
    }
    return result;
  }

  buildApplicant(editParentComponent: EditPersonComponent, applicantType: ApplicantType): Applicant {
    let result = new Applicant(editParentComponent.fullnameComponent.fullnameForm.controls.lastname.value,
      editParentComponent.fullnameComponent.fullnameForm.controls.firstname.value,
      editParentComponent.fullnameComponent.fullnameForm.controls.middlename.value,
      editParentComponent.snilsComponent.snils,
      editParentComponent.fullnameComponent.fullnameForm.controls.noMiddlename.value,
      null, null, null);
    result.identityCard = new IdentityCard(editParentComponent.identityCardComponent.identityCardForm);
    result.citizenships = editParentComponent.citizenshipSelectComponent.citizenships;

    if (this.citizenshipService.hasForeignCitizenship(result.citizenships, editParentComponent.countries)) {
      result.countryStateApplicantDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.CountryStateApplicantDocument);
    }
    result.applicantRepresentParentDocument = this.getDocumentByType(editParentComponent.confirmationDocuments, AttachmentType.ApplicantRepresentParent);

    if (applicantType == ApplicantType.Applicant) {
      //--addresses
      Object.assign(result, this.citizenshipService.hasRfCitizenship(result.citizenships, editParentComponent.countries)
        ? editParentComponent.rfAddressesComponent.getResult()
        : editParentComponent.foreignAddressesComponent.getResult());
      //--
    }

    return result;
  }

  
}
