import { IdentityCard } from "./identityCard.model";

export class Person {
    id: string;
    lastname: string;
    firstname: string;
    middlename: string;
    snils: string;
    noMiddlename: boolean = false;

    birthDate: Date;
    birthPlace: string;
    gender: number = 1;
    identityCard: IdentityCard;
    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean, birthDate?: Date, birthPlace?: string, gender?: number) {
        this.lastname = lastname;
        this.firstname = firstname;

        this.noMiddlename = noMiddlename;
        if (!this.noMiddlename) this.middlename = middlename;

        this.snils = snils;
        if (birthDate) this.birthDate = birthDate;
        if (birthPlace) this.birthPlace = birthPlace;
        if (gender) this.gender = gender;
    }
    private static keys = {
        middlename: "middlename"
    }
    static getFormErrorsTemplate(uniqueSign?: string) {
        let result = {
            lastname: "",
            firstname: "",
            birthDate: "",
            birthPlace: "",
        };
        if (uniqueSign) {
            result[this.keys.middlename.concat(uniqueSign)] = "";
        } else {
            result[this.keys.middlename] = "";
        }
        return result;
    }
    static getvalidationMessages(uniqueSign?: string) {
        let fioValidationObj = {
            required: "Обязательное поле.",
            maxlength: "Значение не должно быть больше 50 символов.",
            pattern: "Имя может состоять только из букв русского алфавита, пробела и дефиса"
        }
        let result = {
            lastname: fioValidationObj,
            firstname: fioValidationObj,
            birthDate: { "required": "Обязательное поле." },
            birthPlace: { "required": "Обязательное поле." },
        }
        if (uniqueSign) {
            result[this.keys.middlename.concat(uniqueSign)] = fioValidationObj;
        } else {
            result[this.keys.middlename] = fioValidationObj;
        }
        return result;
    }
}
