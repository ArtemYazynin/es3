import { Applicant, ApplicantType, Child, ContactInfo, CurrentEducationPlace, FilesInfo, InquiryInfo, Institution, Parent, Privilege } from "../../shared";

export class CompilationOfWizardSteps {
    applicantType: ApplicantType;
    applicant: Applicant;
    parent: Parent;
    children: Array<Child> = [];
    privilege: Privilege;
    institutions: Array<Institution>
    currentEducationPlace: CurrentEducationPlace;
    filesInfo: FilesInfo
    inquiryInfo: InquiryInfo;
    contactInfo: ContactInfo;
}
