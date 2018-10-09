export class Location {
    contentType:string;
    fullName:string;
    code:number;
    typeShort:string;
    currentStatus:number;
    aoLevel:number;
    type:string;
    id:string;
    aoGuid:string;
    zip:string;
    okato:number;
    oktmo:number;
    name:string;
    parents:any

    equals(location: Location){
        if(!location || (typeof location) != "object") return false;
        return this.id == location.id;
    }
 }
