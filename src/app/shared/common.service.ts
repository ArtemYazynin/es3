import { Injectable, QueryList } from '@angular/core';
import { Entity } from './entity';
import { AttachmentType } from './attachment-type.enum';
import { ConfirmationDocument } from './confirmation-document';
import { ConfirmationDocumentComponent } from '../confirmation-document/confirmation-document.component';

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
}
