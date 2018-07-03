import { Injectable } from '@angular/core';
import { Person } from '../../../shared/person';
import { Parent } from '../../../shared/parent';

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