import { ContactInfo, CurrentEducationPlace, } from "./index";
import { ApplicantType, Applicant, Parent, Child, Privilege, Institution, FilesInfo, InquiryInfo } from "../../../shared";

export class CompilationOfWizardSteps {
    id: string
    version: Date;
    number: string;
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
