import { FormGroup } from "@angular/forms";
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

    static construct(form: FormGroup) {
        let result = new Privilege();
        result.id = form.controls.privilege.value.id;
        result.name = form.controls.privilege.value.name;
        result.privilegeOrder = form.controls.privilegeOrder.value;
        return result;
    }
}
