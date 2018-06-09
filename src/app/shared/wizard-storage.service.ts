import { Injectable } from '@angular/core';
import { ApplicantType } from '.';

@Injectable()
export class WizardStorageService {
  private _request:any = {};
  constructor() { }

  get request():any{
    return this._request;
  }
  set applicantType(value:ApplicantType){
    this._request["applicantType"] = value;
  }
}
