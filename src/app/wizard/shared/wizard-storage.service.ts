import { Injectable } from '@angular/core';
import { Child } from '../../shared/child';
import { Parent } from '../../shared/parent';
import { ApplicantType } from '../../shared/applicant-type.enum';
import { Applicant } from '../../shared/applicant';
import { CurrentEducationPlace } from './current-education-place';
import { FileAttachment } from '../../shared/file-attachment';

@Injectable()
export class WizardStorageService {
  private _request: { applicantType: ApplicantType,applicant:Applicant, parent: Parent, children: Array<Child>, currentEducationPlace: CurrentEducationPlace, files: Array<FileAttachment> } = {
    applicant:undefined,
    parent: undefined,
    currentEducationPlace: undefined,
    children: [],
    applicantType: undefined,
    files: []
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
  set files(value: Array<FileAttachment>) {
    this._request.files = value;
  }
}
