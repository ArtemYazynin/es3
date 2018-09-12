export class ConfirmationDocument {
  public name: string;
  public series: string;
  public number: string;
  public dateIssue: Date;
  public dateExpired: Date

  constructor(name: string, series: string, number: string, dateIssue: Date, dateExpired: Date) {
    this.name = name;
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
}
