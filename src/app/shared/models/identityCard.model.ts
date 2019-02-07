import { FormGroup } from "@angular/forms";
import { IdentityCardType } from "./identityCardType";

export class IdentityCard {
    hashCode: number;
    identityCardType: IdentityCardType;

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

    constructor(fg?: FormGroup) {

        if (fg) {
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
        this.hashCode = this.getHashCode();
    }
    static getFields() {
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
        fields.forEach(function (field) {
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
                "dateIssueMoreDateExpired": dateErrorMsg
            },
            dateExpired: {
                "required": "Обязательное поле.",
                "matDatepickerParse": "Неправильный формат даты",
                "matDatepickerMin": "Дата окончания действия документа не может быть раньше текущей даты",
                "dateExpiredLessDateIssue": dateErrorMsg
            },
            issueDepartmentCode: {
                "required": "Обязательное поле.",
                "pattern": "Формат 000-000"
            },
            actRecordNumber: {
                "required": "Обязательное поле.",
                "maxlength": "Максимальная длина 22 символа.",
                "pattern": "Поле должно содержать только буквы русского алфавита и цифры"
            }
        }
    }

    private getHashCode(): number {
        const val = this.identityCardType.toString().concat(this.series).concat(this.number);
        var hash = this.calculateHash(val)
        return hash;
    }
    private calculateHash(data: string): number {
        var hash = 0;
        for (var i = 0; i < data.length; i++) {
            var character = data.charCodeAt(i);
            hash = ((hash << 5) - hash) + character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}

