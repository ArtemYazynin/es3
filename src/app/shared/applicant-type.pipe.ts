import { Pipe, PipeTransform } from '@angular/core';
import { ApplicantType } from './applicant-type.enum';
import { Entity } from './models/entity.model';
import { CommonService } from './common.service';

@Pipe({
  name: 'applicantType'
})
export class ApplicantTypePipe implements PipeTransform {
  constructor(private commonService: CommonService) { }
  transform(value: ApplicantType | Array<ApplicantType>, args?: any): Array<Entity<number>> | string {
    return this.commonService.pipeTransform(value, this.getName)
  }

  private getName(value: ApplicantType) {
    switch (value) {
      case ApplicantType.Parent:
        return "Законный представитель ребенка"
      case ApplicantType.Applicant:
        return "Доверенное лицо законного представителя ребенка";
      case ApplicantType.Child:
        return "Ребёнок-заявитель";
      default:
        return "-";
    }
  }

}
