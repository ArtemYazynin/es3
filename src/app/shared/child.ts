import { ConfirmationDocument } from "./confirmation-document";
import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { Person } from "./person";

export class Child extends Person {
    hashCode: number;
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
        this.hashCode = this.getHashCode();
    }
    private getHashCode():number {
        if(!this.identityCard) return 0;
        const val = this.identityCard.identityCardType.toString().concat(this.identityCard.series).concat(this.identityCard.number);
        var hash = this.calculateHash(val)
        return hash;
    }
    private calculateHash(data:string):number{
        var hash = 0;
        for (var i = 0; i < data.length; i++) {
            var character = data.charCodeAt(i);
            hash = ((hash<<5)-hash)+character;
            hash = hash & hash; // Convert to 32bit integer
        }
        return hash;
    }
}
