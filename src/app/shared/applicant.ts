import { Parent } from "./parent";
import { ApplicantType } from "./applicant-type.enum";
import { ConfirmationDocument } from "./confirmation-document";

export class Applicant {
    public noMiddlename: boolean;
    public familyRelationship: string;
    public parent: Parent;
    public agree: boolean;
    public applicantType: ApplicantType;
    public documentProof:ConfirmationDocument;
    constructor(){
        this.parent = new Parent();
        this.noMiddlename = false;
        this.agree = false;
        this.applicantType = ApplicantType["Родитель/Опекун"];
    }
}
