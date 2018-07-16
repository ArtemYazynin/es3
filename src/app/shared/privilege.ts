import { Entity } from "./entity";
import { PrivilegeOrder } from "./privilege-order";

export class Privilege extends Entity<string> {
    constructor(id:string, name:string, privilegeOrder:string){
        super(id,name);
        this.privilegeOrderId = privilegeOrder;
    }
    privilegeOrderId:string;
}
