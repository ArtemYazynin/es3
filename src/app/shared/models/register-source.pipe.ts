import { Pipe, PipeTransform } from '@angular/core';
import { RegisterSource } from './register-source.enum';

@Pipe({
  name: 'registerSource'
})
export class RegisterSourcePipe implements PipeTransform {

  transform(value: RegisterSource, args?: any): any {
    switch (value) {
      case RegisterSource.Undefined:
        return "Неизвестен";
      case RegisterSource.Ws:
        return "Ведомственная система";
      case RegisterSource.Portal:
        return "Портал";
      case RegisterSource.Epgu:
        return "ЕПГУ";
      case RegisterSource.Import:
        return "Импорт";
      case RegisterSource.Test:
        return "тесты";
      case RegisterSource.Concentrator:
        return "Концентратор";
      case RegisterSource.Rpgu:
        return "РПГУ";
      case RegisterSource.Mfc:
        return "Mfc";
      case RegisterSource.Other:
        return "Другое";
      default:
        return "-";
    }
  }

}
