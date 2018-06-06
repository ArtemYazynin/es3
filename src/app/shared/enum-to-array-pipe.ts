import { Pipe, PipeTransform } from '@angular/core';
import { IdentityCardType } from './identityCardType';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object) {
    if (!data) return;
    let result: Array<any> = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        result.push({
          id:data[key],
          name:IdentityCardType[data[key]]
        });
      }
    }
    return result;
  }
}
