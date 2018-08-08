import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { IdentityCard } from '../person/identity-card/shared/identityCard';
import { IdentityCardType } from '../person/identity-card/shared/identityCardType';
import { CitizenshipService } from './citizenships/citizenship.service';
import { Country } from './citizenships/country';
import { EnumToArrayPipe } from './enum-to-array-pipe';
import { HttpInterceptor } from './http-interceptor';
import { Person } from './person';


@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor(private http: HttpInterceptor, private citizenshipService: CitizenshipService) { }

  fio(person: Person) {
    if (isNullOrUndefined(person)) return "";
    const requiredResult = person.lastname ? person.lastname.concat(" ".concat(person.firstname)) : "";
    if (person.noMiddlename) {
      return requiredResult;
    } else {
      return requiredResult.concat(" ".concat(person.middlename))
    }
  }
  citizenships(countryCodes: Array<number>, countries: Array<Country>) {
    let result = [];
    countryCodes.forEach(code => {
      const country = countries.find(x => x.id == code);
      if (country) result.push(country.name);
    });
    return result;
  }
  identityCard(identityCard: IdentityCard) {
    let result = "";
    if (!identityCard) return result;

    const pipe = new DatePipe('en-US');
    result += new EnumToArrayPipe().transform(IdentityCardType.values(), IdentityCardType)
      .filter(x => x.id == identityCard.identityCardType)
      .map(x => x.name).concat(" ");
    if (identityCard.series != "") {
      result += identityCard.series.concat(" ");
    }
    if (identityCard.number != "") {
      result += identityCard.number.concat(" ");
    }
    if (identityCard.issued != "") {
      result += identityCard.issued.concat(" ");
    }
    if (identityCard.dateIssue.toString() != "") {
      const date = pipe.transform(identityCard.dateIssue, "dd.MM.yyyy");
      result += date.concat(" ");
    }
    if (identityCard.dateExpired.toString() != "") {
      const date = pipe.transform(identityCard.dateExpired, "dd.MM.yyyy");
      result += date.concat(" ");
    }
    if (identityCard.issueDepartmentCode != "") {
      result += identityCard.issueDepartmentCode.concat(" ");
    }
    if (identityCard.actRecordNumber != "") {
      result += identityCard.actRecordNumber.concat(" ");
    }
    return result;
  }
}