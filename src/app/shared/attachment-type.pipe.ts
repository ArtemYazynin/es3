import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'attachmentType'
})
export class AttachmentTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}
