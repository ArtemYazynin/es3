import { IdentityCardType } from "./identityCardType";
import { Client } from "../../../shared/client"
import { FormGroup } from "@angular/forms";

export class IdentityCard {
    identityCardType: IdentityCardType;
    client: Client;

    series: string;
    number: string;
    issued: string;
    dateIssue: Date;
    dateExpired: Date;
    actRecordNumber: string;
    name: string;
    issueDepartmentCode: string;
    isChecked: boolean;
    actRecordDate: Date;
    actRecordPlace: string;
    checkSum: string;

    constructor(fg: FormGroup){
        this.identityCardType = fg.value["identityCardType"]; 
        this.series = fg.value["series"]; 
        this.number = fg.value["number"]; 
        this.issued = fg.value["issued"]; 
        this.dateIssue = fg.value["dateIssue"]; 
        this.dateExpired = fg.value["dateExpired"]; 
        this.actRecordNumber = fg.value["actRecordNumber"]; 
        this.name = fg.value["name"]; 
        this.issueDepartmentCode = fg.value["issueDepartmentCode"]; 
        this.actRecordDate = fg.value["actRecordDate"]; 
        this.actRecordPlace = fg.value["actRecordPlace"]; 
    }
    static getFields(){
        return [
            "name", 
            "series",
            "number",
            "issued",
            "dateIssue",
            "dateExpired",
            "issueDepartmentCode",
            "actRecordNumber",
            "actRecordDate",
            "actRecordPlace"
        ];
    }
    static getFormErrorsTemplate() {
        let fields = IdentityCard.getFields();
        let result = {}; 
        fields.forEach(function(field){         
            result[field] = "";
        });
        return result;
    }

    static getValidationMessages() {
        let dateErrorMsg = "Значение поля \"Дата выдачи\" должно быть меньше значения поля \"Действителен до\"";
        return {
            name: {
                "required": "Обязательное поле.",
                "maxlength": "Максимальная длина 400 символов.",
            },
            series: {
                "required": "Обязательное поле.",
                "pattern": "Поле должно содержать число из 4 цифр.",
                "maxlength": "Максимальная длина 10 символов.",
            },
            number: {
                "required": "Обязательное поле.",
                "pattern": "Поле должно содержать число из 6 цифр.",
                "maxlength": "Максимальная длина 50 символов.",
            },

            issued: {
                "required": "Обязательное поле.",
                "maxlength": "Максимальная длина 6 цифр.",
            },
            dateIssue: {
                "required": "Обязательное поле.",
                "matDatepickerParse": "Неправильный формат даты",
                "matDatepickerMax": "Дата выдачи не может быть позже текущей даты",
                "dateIssueMoreDateExpired":  dateErrorMsg
            },
            dateExpired: {
                "required": "Обязательное поле.",
                "matDatepickerParse": "Неправильный формат даты",
                "matDatepickerMin": "Дата окончания действия документа не может быть раньше текущей даты",
                "dateExpiredLessDateIssue":  dateErrorMsg
            },
            issueDepartmentCode: {
                "required": "Обязательное поле.",
                "pattern": "Формат 000-000"
            },
            actRecordNumber: {
                "required": "Обязательное поле.",
                "maxlength": "Максимальная длина 6 цифр.",
                "pattern": "Формат 6 цифр"
            }
        }
    }
}

