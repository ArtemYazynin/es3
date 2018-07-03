export class Person {
    public lastname: string;
    public firstname: string;
    public middlename: string;
    public snils: string;
    public noMiddlename: boolean;
    public birthDate: Date;
    public birthPlace:string;
    public gender: number;
    constructor() {
        this.noMiddlename = false;
        this.gender = 1;
    }

    static getFormErrorsTemplate() {
        return {
            lastname: "",
            firstname: "",
            middlename: "",
            birthDate:"",
            birthPlace:"",
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
            birthDate:{ "required": "Обязательное поле." },
            birthPlace:{ "required": "Обязательное поле." },
        }
    }
}
