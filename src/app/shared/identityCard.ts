import {IdentityCardType} from "./identityCardType"; 
import {Client} from "./client"

export class IdentityCard{
    public identityCardType: IdentityCardType;
    public client: Client;

    public series: string;
    public number: string;
    public issued: string;
    public dateIssue: Date;
    public dateExpired: Date;
    public actRecordNumber: string;
    public name: string;
    public issueDepartmentCode: string;
    public isChecked:boolean;
    public actRecordDate: Date;
    public actRecordPlace: string;
    public checkSum: string;
}

