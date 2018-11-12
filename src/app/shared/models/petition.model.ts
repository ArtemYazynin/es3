import { FamilyInfo } from "./family-info.model";
import { Person } from "./person.model";
import { PreschoolInquiry } from "./preschool-inquiry.model";

export class Petition {
    constructor(public id: string, public dateCreate: Date, public number: string, public inquiry: PreschoolInquiry,
        public familyInfo: FamilyInfo, public comment: string, public person?: Person, public organizationName?: string) {

    }
}