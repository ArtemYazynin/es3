import { Representative } from "./representative";

export class Applicant {
    public noMiddlename: boolean;
    public snils: string;
    public familyRelationship: string;
    public representative: Representative;
    public agree: boolean;

    constructor(){
        this.representative = new Representative();
        this.noMiddlename = false;
        this.agree = false;
    }
}
