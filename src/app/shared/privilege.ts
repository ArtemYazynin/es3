import { Entity } from "./entity";
import { PrivilegeOrder } from "./privilege-order";
import { ConfirmationDocument } from "./confirmation-document";

export class Privilege extends Entity<string> {
    constructor(id:string, name:string, privilegeOrder:PrivilegeOrder){
        super(id,name);
        this.privilegeOrder = privilegeOrder;
    }
    privilegeOrder:PrivilegeOrder;

    privilegeProofDocument:ConfirmationDocument
}
