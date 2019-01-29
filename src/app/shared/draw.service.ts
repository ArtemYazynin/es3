import { DatePipe } from "@angular/common";
import { Injectable } from "@angular/core";
import { isNullOrUndefined } from "util";
import { Country } from "./models/country.model";
import { Person } from "./models/person.model";
import { Address } from "./models/address.model";
import { AddressBuilder } from "./addressBuilder/address-builder.model";
import { AddressBuilderDirector } from "./addressBuilder/address-builder-director";
import { IdentityCard } from "./models/identityCard.model";
import { EnumToArrayPipe } from "./enum-to-array-pipe";
import { IdentityCardType } from "./models/identityCardType";

@Injectable()
export class DrawService {
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
    if(!countryCodes) return result;
    countryCodes.forEach(code => {
      const country = countries.find(x => x.id == code);
      if (country) result.push(country.name);
    });
    return result;
  }

  address(address: Address) {
    if (address) {
      const builder = new AddressBuilder(address);
      new AddressBuilderDirector().construct(builder);
      return builder.getResult();
    } else {
      return "-";
    }
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
