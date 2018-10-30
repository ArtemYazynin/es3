import { DatePipe } from "@angular/common";
import { Entity } from "./entity.model";

export class ConfirmationDocument extends Entity<string>{
  public series: string;
  public number: string;
  public dateIssue: Date;
  public dateExpired: Date

  constructor(name: string, series: string, number: string, dateIssue: Date, dateExpired: Date, id?: string) {
    super(id || "", name)
    this.series = series;
    this.number = number;
    this.dateIssue = dateIssue;
    this.dateExpired = dateExpired;
  }
  static formErrorsTemplate = {
    "name": "",
    "series": "",
    "number": "",
    "dateIssue": ""
  }
  static validationMessages = {
    "name": {
      "required": "Обязательное поле.",
      "maxlength": "Максимальная длина 250 символов.",
    },
    "series": {
      "maxlength": "Максимальная длина 250 символов.",
    },
    "number": {
      "required": "Обязательное поле.",
      "maxlength": "Максимальная длина 250 символов.",
    },
    "dateIssue": {
      "required": "Обязательное поле.  Введите дату в формате ДД.ММ.ГГГГ.",
    }
  }

  static toString(document: ConfirmationDocument): string {
    if (!document) return "-";
    let pipe = new DatePipe('en-US');
    let result = "";
    result += document.name ? `${document.name}; ` : "";
    result += document.series ? `${document.series}; ` : "";
    result += document.number ? `${document.number}; ` : "";
    result += document.dateIssue ? `Дата выдачи: ${pipe.transform(document.dateIssue, "dd.MM.yyyy")} ` : "";
    result += document.dateExpired ? `Действителен до: ${pipe.transform(document.dateExpired, "dd.MM.yyyy")} ` : "";
    return result;
  }
}
