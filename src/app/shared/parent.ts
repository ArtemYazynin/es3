import { IdentityCard } from "./identityCard";
import { Person } from "./person";
import { ConfirmationDocument } from "./confirmation-document";



export class Parent {
    public IdentityCard: IdentityCard;
    public citizenship: string;
    public relationType: string;
    public agree: boolean;
    public person: Person;
    public countryStateDocument: ConfirmationDocument
    public representChildrenInterestsDocument: ConfirmationDocument;
    
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
