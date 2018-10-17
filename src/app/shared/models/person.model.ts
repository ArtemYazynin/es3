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

    static getFormErrorsTemplate() {
        return {
            lastname: "",
            firstname: "",
            middlename: "",
            birthDate: "",
            birthPlace: "",
        };
    }
    static getvalidationMessages() {
        let fioValidationObj = {
            required: "Обязательное поле.",
            maxlength: "Значение не должно быть больше 50 символов.",
            pattern: "Имя может состоять только из букв русского алфавита, пробела и дефиса"
        }
        return {
            lastname: fioValidationObj,
            firstname: fioValidationObj,
            middlename: fioValidationObj,
            birthDate: { "required": "Обязательное поле." },
            birthPlace: { "required": "Обязательное поле." },
        }
    }
}
