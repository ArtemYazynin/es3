import { Applicant, ApplicantType, Child, CurrentEducationPlace, FileAttachment, InquiryInfo, Parent, Privilege, ContactInfo } from "../../shared";

export class CompilationOfWizardSteps {
    applicantType: ApplicantType;
    applicant: Applicant;
    parent: Parent; 
    children: Array<Child> = [];
    privilege:Privilege;
    currentEducationPlace: CurrentEducationPlace; 
    files: Array<FileAttachment> = [];
    inquiryInfo:InquiryInfo;
    contactInfo:ContactInfo;
}
