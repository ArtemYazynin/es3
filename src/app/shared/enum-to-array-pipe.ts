import { Pipe, PipeTransform } from '@angular/core';
import { IdentityCardType } from './identityCardType';
import { ApplicantType } from './applicant-type.enum';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object, type: any) {
    if (!data) return;


    let result: Array<any> = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        result.push({
          id:data[key],
          name:type[data[key]]
        });
      }
    }
    return result;
  }
}
