import { Entity } from "./entity";
import { PrivilegeOrder } from "./privilege-order";

export class Privilege extends Entity<string> {
    constructor(id:string, name:string, privilegeOrder:PrivilegeOrder){
        super(id,name);
        this.privilegeOrder = privilegeOrder;
    }
    privilegeOrder:PrivilegeOrder;
}
