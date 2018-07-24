import { Applicant, ApplicantType, Child, CurrentEducationPlace, FileAttachment, InquiryInfo, Parent, Privilege } from "../../shared";

export class CompilationOfWizardSteps {
    applicantType: ApplicantType;
    applicant: Applicant;
    parent: Parent; 
    children: Array<Child> = [];
    privilege:Privilege;
    currentEducationPlace: CurrentEducationPlace; 
    files: Array<FileAttachment> = [];
    inquiryInfo:InquiryInfo;
}
