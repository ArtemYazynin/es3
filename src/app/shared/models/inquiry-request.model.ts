import { ApplicantType } from "../applicant-type.enum";
import { InquiryTypeFriendlyNamePipe } from "../inquiry-type.pipe";
import { Applicant } from "./applicant.model";
import { Child } from "./child.model";
import { ContactInfo } from "./contact-info.model";
import { FromPlace } from "./from-place.model";
import { FilesInfo } from "./files-info.model";
import { InquiryInfoRequest } from "./inquiry-info-request.model";
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

export class Inquiry {
    id: string;
    version: Date;
    number: string;
    registerDateTime: Date;
    applicantType: ApplicantType;
    registerSource: RegisterSource;

    applicantId: string;
    parentInfoId: string;
    contactInfoId:string;
    children: Array<string> = [];
    
    statusId:string;
    privilegeId:string;
    wishInstitutions: Array<string>;
    fromPlaceId:string;

    addInformation: string;
}

export class InquiryRequest {
    private def = "-";
    private _type: string;
    constructor(inquiry?: InquiryRequest) {
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
    currentEducationPlace: FromPlace;
    filesInfo: FilesInfo
    inquiryInfo: InquiryInfoRequest;
    specHealth: SpecHealth;

    contactInfo: ContactInfo;
    petition: Petition;

    /** ONLY SCHOOL FUNCTIONALITY */
    schoolClasses: Array<SchoolClass>;
    schoolInquiryInfo: SchoolInquiryInfo;
    IsLearnEducCenter: boolean;
    /** END */
}
