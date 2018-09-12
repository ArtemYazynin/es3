import { ApplicantType } from "./applicant-type.enum";
import { Applicant } from "./applicant";
import { Child } from "./child";
import { Parent } from "./parent";
import { CurrentEducationPlace } from "./current-education-place";
import { Privilege } from "./privilege";
import { Institution } from "./institution";
import { FilesInfo } from "./files-info";
import { ContactInfo } from "./contact-info";
import { InquiryInfo } from "./inquiry-info";

export class Inquiry{
    id:string;
    version:Date;
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
