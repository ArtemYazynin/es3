import { Applicant } from "./applicant";
import { Child } from "./child";
import { Parent } from "./parent";
import { CurrentEducationPlace } from "./current-education-place";
import { Privilege } from "./privilege";
import { Institution } from "./institution";
import { FilesInfo } from "./files-info";
import { ContactInfo } from "./contact-info";
import { InquiryInfo } from "./inquiry-info";
import { RegisterSource } from "./register-source.enum";
import { PortalIdentity } from "./portal-identity";
import { Status } from "./status";
import { inquiryType } from "./inquiry-type";
import { ApplicantType } from "../applicant-type.enum";
import { InquiryTypeFriendlyNamePipe } from "../inquiry-type.pipe";

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
}
