import { Representative } from "./representative";
import { ApplicantType } from "./applicant-type.enum";
import { ConfirmationDocument } from "./confirmation-document";

export class Applicant {
    public noMiddlename: boolean;
    public familyRelationship: string;
    public representative: Representative;
    public agree: boolean;
    public applicantType: ApplicantType;
    public documentProof:ConfirmationDocument;
    constructor(){
        this.representative = new Representative();
        this.noMiddlename = false;
        this.agree = false;
        this.applicantType = ApplicantType["Родитель/Опекун"];
    }
}
