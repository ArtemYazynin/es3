import { IdentityCardType } from "./identityCardType";
import { Client } from "./client"

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

    static getFormErrorsTemplate() {
        return {
            series: "",
            number: "",
            issued: "",
            dateIssue: "",
            dateExpired: "",
            issueDepartmentCode: "",
            actRecordNumber: "",
            actRecordDate: "",
            actRecordPlace: ""
        };
    }

    static getValidationMessages() {
        return {
            series: {
                "required": "Обязательное поле."
            },
            number: {
                "required": "Обязательное поле."
            },

            issued: {
                "required": "Обязательное поле."
            },
            dateIssue: {
                "required": "Обязательное поле."
            },
            dateExpired: {
                "required": "Обязательное поле."
            },
            issueDepartmentCode: {
                "required": "Обязательное поле.",
                "pattern": "Формат 000-000"
            },
            actRecordNumber: {
                "required": "Обязательное поле.",
                "maxlength": "Максимальная длина 6 цифр.",
                "minlength": "Минимальная длина 6 цифр.",
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

