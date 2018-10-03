import { ApplicantType } from "../applicant-type.enum";
import { InquiryTypeFriendlyNamePipe } from "../inquiry-type.pipe";
import { Applicant } from "./applicant";
import { Child } from "./child";
import { ContactInfo } from "./contact-info";
import { CurrentEducationPlace } from "./current-education-place";
import { FilesInfo } from "./files-info";
import { InquiryInfo } from "./inquiry-info";
import { Institution } from "./institution";
import { Parent } from "./parent";
import { PortalIdentity } from "./portal-identity";
import { Privilege } from "./privilege";
import { RegisterSource } from "./register-source.enum";
import { Status } from "./status";
import { SchoolInquiryInfo } from "./school-inquiry-info";
import { SchoolClass } from "./school-class";

export class Inquiry {
    private def = "-";
    private _type: string;
    constructor(inquiry?: Inquiry) {
        if (!inquiry) return;
        for (const key in inquiry) {
            if (inquiry.hasOwnProperty(key)) {
                this[key] = inquiry[key];
            }
        }
    }

    get type() {
        return this._type;
    }
    set type(type: any) {
        this._type = type ? type : this.def;
        this.typeFriendlyName = new InquiryTypeFriendlyNamePipe().transform(this.type);
    }

    id: string;
    version: Date;
    typeFriendlyName: string;
    registerDateTime: Date;
    number: string;
    registerSource: RegisterSource;
    portalIdentity: PortalIdentity;
    status: Status;
    addInformation: string;

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
    
    /** ONLY SCHOOL FUNCTIONALITY */
    schoolClasses: Array<SchoolClass>;
    schoolInquiryInfo: SchoolInquiryInfo;
    /** END */
}
