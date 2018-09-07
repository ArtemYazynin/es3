import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { Address } from "./address";
import { ConfirmationDocument } from "./confirmation-document";
import { Person } from "./person";
import { PersonWithAddress } from "./person-with-address";

export class Applicant extends Person implements PersonWithAddress {
    identityCard: IdentityCard;

    citizenships: Array<number>;
    countryStateApplicantDocument: ConfirmationDocument

    applicantRepresentParentDocument: ConfirmationDocument;

    register: Address;
    residential: Address;
    tempRegistrationExpired: Date;
    registerAddressLikeAsResidentialAddress: boolean;
}
