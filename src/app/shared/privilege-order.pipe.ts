import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'privilegeOrder'
})
export class PrivilegeOrderPipe implements PipeTransform {

  transform(order: any, args?: any): any {
    return null;
  }

}
