import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToArray'
})
export class EnumToArrayPipe implements PipeTransform {
  transform(data: Object, type: any):Array<{id:number, name:string}> {
    if (!data) return;

    let result = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        result.push({
          id:parseInt(data[key]),
          name:<string>type[data[key]]
        });
      }
    }
    return result;
  }
}
