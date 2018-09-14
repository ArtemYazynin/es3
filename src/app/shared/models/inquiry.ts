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
import { RegisterSource } from "./register-source.enum";
import { PortalIdentity } from "./portal-identity";
import { Status } from "./status";
import { inquiryType } from "./inquiry-type";

export class Inquiry {
    private def = "-";
    private _type:string;
    constructor(inquiry?:Inquiry){
        if(!inquiry) return;
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
        this.setFriendlyName();
    }
    private setFriendlyName() {
        if (this._type) {
            switch (this._type) {
                case inquiryType.preschool:
                    this.typeFriendlyName = "ДОО";
                    break;
                case inquiryType.school:
                    this.typeFriendlyName = "ООО";
                    break;
                case inquiryType.odo:
                    this.typeFriendlyName = "ОДО";
                    break;
                case inquiryType.healthCamp:
                    this.typeFriendlyName = "ЗОЛ";
                    break;
                case inquiryType.profEducation:
                    this.typeFriendlyName = "ПОО";
                    break;
                default:
                    this.typeFriendlyName = this.def;
                    break;
            }
        } else {
            this.typeFriendlyName = this.def;
        }
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
