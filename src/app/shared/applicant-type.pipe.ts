import { Pipe, PipeTransform } from '@angular/core';
import { ApplicantType } from './applicant-type.enum';
import { Entity } from './models/entity';

@Pipe({
  name: 'applicantType'
})
export class ApplicantTypePipe implements PipeTransform {

  transform(value: ApplicantType | Array<ApplicantType>, args?: any): Array<Entity<number>> | string {
    if (value.constructor == Array) {
      let result: Array<Entity<number>> = [];
      (<Array<ApplicantType>>value).forEach(x => {
        result.push(new Entity<number>(x, this.getName(x)));
      });
      return result;
    } else {
      return this.getName(<ApplicantType>value);
    }
  }

  private getName(value: ApplicantType) {
    switch (value) {
      case ApplicantType.Parent:
        return "Законный представитель ребенка"
      case ApplicantType.Applicant:
        return "Доверенное лицо законного представителя ребенка";
      case ApplicantType.Child:
        return "Ребенок-заявитель";
      default:
        return "-";
    }
  }

}
