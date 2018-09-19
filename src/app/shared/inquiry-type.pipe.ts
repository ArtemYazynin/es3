import { Pipe, PipeTransform } from '@angular/core';
import { inquiryType } from "./models/inquiry-type"
@Pipe({
  name: 'inquiryTypeFriendlyName'
})
export class InquiryTypeFriendlyNamePipe implements PipeTransform {

  transform(systemName: string, args?: any): string {
    switch (systemName) {
      case inquiryType.preschool:
        return "ДОО";
      case inquiryType.school:
        return "ООО";
      case inquiryType.odo:
        return "ОДО";
      case inquiryType.healthCamp:
        return "ЗОЛ";
      case inquiryType.profEducation:
        return "ПОО";
      default:
        return "-";
    }
  }

}
