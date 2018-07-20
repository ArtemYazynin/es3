import { Person } from "./person";
import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { ConfirmationDocument } from "./confirmation-document";

export class Applicant {
    person: Person;
    IdentityCard: IdentityCard;

    citizenships: Array<number>;
    countryStateApplicantDocument:ConfirmationDocument

    applicantRepresentParentDocument:ConfirmationDocument;
}
