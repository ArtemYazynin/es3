import { Pipe, PipeTransform } from '@angular/core';
import { CommonService } from './common.service';
import { PetitionType } from './petition-type.enum';

@Pipe({
  name: 'petitionType'
})
export class PetitionTypePipe implements PipeTransform {
  constructor(private commonService: CommonService) { }
  transform(value: any, args?: any): any {
    return this.commonService.pipeTransform(value, this.getName)
  }
  private getName(value: PetitionType) {
    switch (value) {
      case PetitionType.Individual:
        return "Физическое лицо"
      case PetitionType.Organization:
        return "Организация";
      default:
        return "-";
    }
  }
}
