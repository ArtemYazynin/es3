export class Person {
    public lastname: string;
    public firstname: string;
    public middlename: string;
    public snils: string;
    public noMiddlename: boolean;
    constructor() {
        this.noMiddlename = false;
    }

    static getFormErrorsTemplate() {
        return {
            lastname: "",
            firstname: "",
            middlename: "",
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
            middlename: fioValidationObj
        }
    }
}
