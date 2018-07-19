import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { Person } from "./person";
import { ConfirmationDocument } from "./confirmation-document";
import { RelationType } from "./relationTypes/relation-type";



export class Parent {
    person: Person;
    IdentityCard: IdentityCard;

    citizenships: Array<number>;
    countryStateDocument: ConfirmationDocument

    relationType: RelationType;
    parentRepresentChildrenDocument: ConfirmationDocument;

    static getFormErrorsTemplate() {
        return {
            citizenship: ""
        };
    }

    static getvalidationMessages() {
        return {
            citizenship: {
                "required": "Обязательное поле.",
            }
        }
    }
}
