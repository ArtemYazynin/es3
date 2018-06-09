import { IdentityCard } from "./identityCard";
import { Person } from "./person";


export class Parent {
    public IdentityCard: IdentityCard;
    public citizenship: string;
    public relationType: string;
    public agree: boolean;
    public person: Person;
    constructor() {
        this.IdentityCard = new IdentityCard();
        this.person = new Person();
        this.agree = false;
    }

    static getFormErrorsTemplate() {
        return {
            snils: "",
            citizenship: ""
        };
    }

    static getvalidationMessages() {
        return {
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
