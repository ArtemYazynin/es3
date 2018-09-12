import { Address } from "./address";
import { Person } from "./person";
import { IdentityCard } from "./identityCard";
import { ConfirmationDocument } from "./confirmation-document";
import { RelationType } from "./relation-type";
import { PersonWithAddress } from "./person-with-address";

export class Parent extends Person implements PersonWithAddress {
    identityCard: IdentityCard;

    citizenships: Array<number>;
    countryStateDocument: ConfirmationDocument

    relationType: RelationType;
    parentRepresentChildrenDocument: ConfirmationDocument;

    register: Address;
    residential: Address;
    tempRegistrationExpiredDate: Date;
    registerAddressLikeAsResidentialAddress: boolean;
}
