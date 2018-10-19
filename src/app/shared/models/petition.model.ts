import { PreschoolInquiry } from "./preschool-inquiry.model";
import { Person } from "./person.model";
import { FamilyInfo } from "./family-info.model";

export class Petition {
    constructor(public id: string, public dateCreate: Date, public number: string, public inquiry: PreschoolInquiry,
        public person: Person, public organizationName: string, public familyInfo: FamilyInfo, public comment: string) {

    }
}