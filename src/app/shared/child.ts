import { ConfirmationDocument } from "./confirmation-document";
import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { Person } from "./person";

export class Child extends Person {
    
    identityCard: IdentityCard;
    citizenships: Array<number>;
    specHealth: number;
    specHealthDocument: ConfirmationDocument

    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean, birthDate: Date, birthPlace: string, gender: number,
        citizenship: Array<number>, specHealth: number, specHealthDocument: ConfirmationDocument, identityCard: IdentityCard) {
        super(lastname, firstname, middlename, snils, noMiddlename, birthDate, birthPlace, gender);
        
        this.identityCard = identityCard;
        this.citizenships = citizenship || [];
        this.specHealth = specHealth;
        this.specHealthDocument = specHealthDocument;
        
    }
    
}
