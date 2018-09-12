export class CurrentEducationPlace {
    municipality:string;
    institutionType:number;
    institution:string;
    group:string;
    other:string;
    isOther:boolean;

    constructor(municipality:string,institutionType:number,institution:string,group:string,isOther:boolean,other:string){
        this.municipality = municipality;
        this.institutionType = institutionType;
        this.institution = institution;
        this.group = group;
        this.isOther = isOther;
        this.other = other;
    }
}
