import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Person } from '.';
import { IdentityCard } from '../person/identity-card/shared/identityCard';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  fio(person: Person) {
    if (isNullOrUndefined(person)) return "";
    const requiredResult = person.lastname ? person.lastname.concat(" ".concat(person.firstname)) : "";
    if (person.noMiddlename) {
      return requiredResult;
    } else {
      return requiredResult.concat(" ".concat(person.middlename))
    }
  }
  identityCard(identityCard:IdentityCard){
    return "";
  }
}
