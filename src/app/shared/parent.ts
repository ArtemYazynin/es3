import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { Person } from "./person";
import { ConfirmationDocument } from "./confirmation-document";
import { RelationType } from "./relationTypes/relation-type";
import { PersonWithAddress } from "./person-with-address";
import { Address } from "./address";

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
