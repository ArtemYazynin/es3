import { IdentityCardType } from "./identityCardType";
import { Client } from "../../../shared/client"

export class IdentityCard {
    public identityCardType: IdentityCardType;
    public client: Client;

    public series: string;
    public number: string;
    public issued: string;
    public dateIssue: Date;
    public dateExpired: Date;
    public actRecordNumber: string;
    public name: string;
    public issueDepartmentCode: string;
    public isChecked: boolean;
    public actRecordDate: Date;
    public actRecordPlace: string;
    public checkSum: string;

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
                "dateIssueMoreDateExpired":  dateErrorMsg
            },
            dateExpired: {
                "required": "Обязательное поле.",
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
            },
            actRecordDate: {
                "required": "Обязательное поле."
            },
            actRecordPlace: {
                "required": "Обязательное поле."
            }
        }
    }
}

