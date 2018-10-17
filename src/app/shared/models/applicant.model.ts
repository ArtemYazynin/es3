import { Address } from "./address.model";
import { ConfirmationDocument } from "./confirmation-document.model";
import { Person } from "./person.model";
import { PersonWithAddress } from "./person-with-address.model";
import { IdentityCard } from "./identityCard.model";
import { FormGroup } from "@angular/forms";

export class Applicant extends Person implements PersonWithAddress {
    constructor(lastname: string, firstname: string, middlename: string, snils: string, noMiddlename: boolean, birthDate: Date, birthPlace: string, gender: number) {
        super(lastname, firstname, middlename, snils, noMiddlename, birthDate, birthPlace, gender);

    }
    citizenships: Array<number>;
    countryStateApplicantDocument: ConfirmationDocument
    applicantRepresentParentDocument: ConfirmationDocument;
    register: Address;
    residential: Address;
    tempRegistrationExpiredDate: Date;
    registerAddressLikeAsResidentialAddress: boolean;

    static get systemName() {
        return "applicant";
    }
}
