import { FormGroup } from "@angular/forms";

export class Person {
    lastname: string;
    firstname: string;
    middlename: string;
    snils: string;
    noMiddlename: boolean = false;

    birthDate: Date;
    birthPlace: string;
    gender: number = 1;

    constructor(lastname: string,firstname: string,middlename: string,snils: string,noMiddlename: boolean,birthDate: Date,birthPlace: string,gender: number){
        this.lastname = lastname;
        this.firstname = firstname;

        this.noMiddlename = noMiddlename;
        if (!this.noMiddlename) this.middlename = middlename;

        this.snils = snils;
        this.birthDate = birthDate;
        this.birthPlace = birthPlace;
        this.gender = gender;
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
