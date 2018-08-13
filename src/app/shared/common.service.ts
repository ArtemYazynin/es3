import { Injectable, QueryList } from '@angular/core';
import { ConfirmationDocumentComponent } from '../confirmation-document/confirmation-document.component';
import { AttachmentType } from './attachment-type.enum';
import { ConfirmationDocument } from './confirmation-document';
import { Entity } from './entity';

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
}
