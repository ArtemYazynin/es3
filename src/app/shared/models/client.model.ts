import { Person } from "./person.model";
import { IdentityCard } from "./identityCard.model";

export class Client extends Person {
    public IdentityCards: Array<IdentityCard>;
    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean,
        birthDate: Date, birthPlace: string, gender: number, identityCards: Array<IdentityCard>) {
        super(lastname, firstname, middlename, snils, noMiddlename, birthDate, birthPlace, gender);
        this.IdentityCards = identityCards || [];
    }
}