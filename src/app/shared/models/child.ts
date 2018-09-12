import { ConfirmationDocument } from "./confirmation-document";
import { Person } from "./person";
import { PersonWithAddress } from "./person-with-address";
import { Address } from "./address";
import { IdentityCard } from "./identityCard";

export class Child extends Person implements PersonWithAddress {
    identityCard: IdentityCard;
    citizenships: Array<number>;
    specHealth: number;
    specHealthDocument: ConfirmationDocument
    disabledChild: any;
    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean, birthDate: Date, birthPlace: string, gender: number,
        citizenship: Array<number>, specHealth: number, specHealthDocument: ConfirmationDocument, identityCard: IdentityCard, disabledChild: any) {
        super(lastname, firstname, middlename, snils, noMiddlename, birthDate, birthPlace, gender);

        this.identityCard = identityCard;
        this.citizenships = citizenship || [];
        this.specHealth = specHealth;
        this.specHealthDocument = specHealthDocument;
        this.disabledChild = disabledChild;
    }

    register: Address;
    residential: Address;
    tempRegistrationExpiredDate: Date;
    registerAddressLikeAsResidentialAddress: boolean;
}
