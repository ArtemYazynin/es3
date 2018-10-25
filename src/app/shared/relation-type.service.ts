import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { HttpInterceptor } from './http-interceptor';
import { RelationType } from './models/relation-type.model';
import { SERVER_URL } from '../app.module';
import { EditPersonComponent } from '../modules/inquiry/shared/components/edit-person/edit-person.component';
import { Person } from './models/person.model';
import { Parent } from './models/parent.model';

@Injectable()
export class RelationTypeService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  get(): Observable<Array<RelationType>> {
    return this.http.get(`${this.serverUrl}/relationTypes`).pipe(map(result => {
      return <Array<RelationType>>result.json();
    }));
  }

  setRelationType(editPersonComponent: EditPersonComponent, person:Parent) {
    if (editPersonComponent.relationTypeComponent.owner.relationType) {
      person["relationType"] = editPersonComponent.relationTypeComponent.owner.relationType;
      this.setDocument(editPersonComponent,person)
    }
  }

  private setDocument(editPersonComponent: EditPersonComponent, person:Person){
    const docKey = "parentRepresentChildrenDocument";
    if (editPersonComponent.relationTypeComponent.owner.relationType.confirmationDocument) {
      person[docKey] = editPersonComponent.relationTypeComponent.editConfirmationDocumentComponent.getResult();
    } else {
      delete person[docKey]
    }
  }
}
