import { ApplicantType } from "../applicant-type.enum";
import { InquiryTypeFriendlyNamePipe } from "../inquiry-type.pipe";
import { Applicant } from "./applicant.model";
import { Child } from "./child.model";
import { ContactInfo } from "./contact-info.model";
import { CurrentEducationPlace } from "./current-education-place.model";
import { FilesInfo } from "./files-info.model";
import { InquiryInfo } from "./inquiry-info.model";
import { Institution } from "./institution.model";
import { Parent } from "./parent.model";
import { PortalIdentity } from "./portal-identity.model";
import { Privilege } from "./privilege.model";
import { RegisterSource } from "./register-source.enum";
import { SchoolClass } from "./school-class.model";
import { SchoolInquiryInfo } from "./school-inquiry-info.model";
import { Status } from "./status.model";
import { Petition } from "./petition.model";
import { SpecHealth } from "./spec-health.model";
import { FileAttachment } from "./file-attachment.model";

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
    haveDigitalSignature:boolean = false;
    files: Array<FileAttachment>;
    inquiryInfo: InquiryInfo;
    specHealth: SpecHealth;

    contactInfo: ContactInfo;
    petition:Petition;

    /** ONLY SCHOOL FUNCTIONALITY */
    schoolClasses: Array<SchoolClass>;
    schoolInquiryInfo: SchoolInquiryInfo;
    IsLearnEducCenter: boolean;
    /** END */
}
