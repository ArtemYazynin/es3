import { ConfirmationDocument } from "./confirmation-document.model";
import { Entity } from "./entity.model";
import { PrivilegeOrder } from "./privilege-order.model";

export class Privilege extends Entity<string> {
    constructor(id?: string, name?: string, privilegeOrder?: PrivilegeOrder) {
        super(id, name);
        this.privilegeOrder = privilegeOrder;
    }
    privilegeOrder: PrivilegeOrder;
    privilegeProofDocument: ConfirmationDocument;
}
