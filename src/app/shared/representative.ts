import { IdentityCard } from "./identityCard";
import { Person } from "./person";


export class Representative extends Person {
    public IdentityCard: IdentityCard;
    public citizenship: string;
    public relationType: string;

    constructor() {
        super();
        this.IdentityCard = new IdentityCard();
    }

    static getFormErrorsTemplate() {
        return {
            lastname: "",
            firstname: "",
            middlename: "",
            snils: "",
            citizenship: ""
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
            citizenship: {
                "required": "Обязательное поле.",
            },
            snils: {
                "required": "Обязательное поле.",
                "pattern": "Значение должно состоять из целых чисел вида 123-456-789 00"
            }
        }
    }
}
