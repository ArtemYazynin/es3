import { Pipe, PipeTransform } from '@angular/core';
import { IdentityCardType } from '../../../shared';

@Pipe({
  name: 'identityCardType'
})
export class IdentityCardTypePipe implements PipeTransform {

  transform(value: IdentityCardType, args?: any): any {
    switch (value) {
      case value:
        
        break;
    
      default:
        break;
    }
  }

}
