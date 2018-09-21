import { Address } from "./address";
import { ConfirmationDocument } from "./confirmation-document";
import { Person } from "./person";
import { PersonWithAddress } from "./person-with-address";
import { IdentityCard } from "./identityCard";

export class Applicant extends Person implements PersonWithAddress {
    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean, birthDate: Date, birthPlace: string, gender: number) {
        super(lastname, firstname, middlename, snils, noMiddlename, birthDate, birthPlace, gender);

    }
    
    identityCard: IdentityCard;
    citizenships: Array<number>;
    countryStateApplicantDocument: ConfirmationDocument
    applicantRepresentParentDocument: ConfirmationDocument;
    register: Address;
    residential: Address;
    tempRegistrationExpiredDate: Date;
    registerAddressLikeAsResidentialAddress: boolean;

    static get systemName(){
        return "applicant";
    }
}
