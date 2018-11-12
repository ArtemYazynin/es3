import { DatePipe } from "@angular/common";
import { Entity } from "./entity.model";
import { FormGroup } from "@angular/forms";
import { Guid } from "./guid";

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

  static construct(form: FormGroup, id?: string) {
    return new ConfirmationDocument(form.controls.name.value,
      form.controls.series.value,
      form.controls.number.value,
      form.controls.dateIssue.value,
      form.controls.dateExpired.value,
      id ? id : Guid.newGuid());
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

  equals(doc: ConfirmationDocument) {
    const equalId = this.id && doc.id ? this.id == doc.id : true;
    const equalDateIssuse = this.dateIssue ? this.dateIssue == doc.dateIssue : true;
    const equalDateExpired = this.dateExpired ? this.dateExpired == doc.dateExpired : true;
    return equalId && this.name == doc.name && this.series == doc.series && this.number == doc.number && equalDateIssuse && equalDateExpired;
  }
}
