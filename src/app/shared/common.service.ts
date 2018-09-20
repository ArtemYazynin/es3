import { Injectable, QueryList } from '@angular/core';
import { ConfirmationDocumentComponent } from './components/confirmation-document/confirmation-document.component';
import { Entity } from './models/entity';
import { ConfirmationDocument } from './models/confirmation-document';
import { AttachmentType } from './models/attachment-type.enum';
import { IdentityCardType } from './models/identityCardType';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

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
}
