import { Injectable } from '@angular/core';
import { Child } from '../../shared/child';
import { Parent } from '../../shared/parent';
import { ApplicantType } from '../../shared/applicant-type.enum';
import { CurrentEducationPlace, RelationType } from '../../shared';

@Injectable()
export class WizardStorageService {
  private _request: { applicantType: ApplicantType,parent: Parent, children: Array<Child>, currentEducationPlace:CurrentEducationPlace } = {
    parent: undefined,
    currentEducationPlace:undefined,
    children: [],
    applicantType:undefined
  };
  constructor() { }

  get request() {
    return this._request;
  }
  set applicantType(value: ApplicantType) {
    this._request["applicantType"] = value;
  }
  set parent(value: Parent) {
    this.request["parent"] = value;
  }
  set children(value: Array<Child>) {
    this._request["children"] = value;
  }
  set currentEducationPlace(value: CurrentEducationPlace) {
    this._request["currentEducationPlace"] = value;
  }
}
