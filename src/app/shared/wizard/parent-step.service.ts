import { Injectable } from '@angular/core';
import { Person } from '../person';
import { Parent } from '../parent';

@Injectable({
  providedIn: 'root'
})
export class ParentStepService {

  constructor() { }

  getFormErrors(){
    return Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  }
  getValidationMessages(){
    return Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());
  }
}
