import { Pipe, PipeTransform } from '@angular/core';
import { AreaType } from './models/area-type.enum';
import { CommonService } from './common.service';

@Pipe({
  name: 'areaType'
})
export class AreaTypePipe implements PipeTransform {
  constructor(private commonService: CommonService) { }
  transform(value: any, args?: any): any {
    return this.commonService.pipeTransform(value, this.getName)
  }

  private getName(value: AreaType) {
    switch (value) {
      case AreaType.Region:
        return "Регион"
      case AreaType.Municipality:
        return "Муниципалитет";
      case AreaType.District:
        return "Район";
      case AreaType.Institution:
        return "ОО"
      default:
        return "-";
    }
  }

}