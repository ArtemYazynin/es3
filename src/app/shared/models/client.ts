import { Person } from "./person";
import { IdentityCard } from "./identityCard";

export class Client extends Person {
    public IdentityCards: Array<IdentityCard>;
    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean,
        birthDate: Date, birthPlace: string, gender: number, identityCards: Array<IdentityCard>) {
        super(lastname, firstname, middlename, snils, noMiddlename, birthDate, birthPlace, gender);
        this.IdentityCards = identityCards || [];
    }
}