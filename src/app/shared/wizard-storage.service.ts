import { Injectable } from '@angular/core';
import { ApplicantType, Parent, Person, Child } from '.';

@Injectable()
export class WizardStorageService {
  private _request:{ parent:Parent, children:Array<Child>} = {
    parent:undefined,
    children:[]
  };
  constructor() { }

  get request():any{
    return this._request;
  }
  set applicantType(value:ApplicantType){
    this._request["applicantType"] = value;
  }
  set parent(value:Parent){
    this.request["parent"] = value;
  }
  set children(value: Array<Child>){
    this._request["children"] = value;
  }
}
