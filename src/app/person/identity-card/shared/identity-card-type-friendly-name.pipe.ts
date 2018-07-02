import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'identityCardTypeFriendlyName'
})
export class IdentityCardTypeFriendlyNamePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
