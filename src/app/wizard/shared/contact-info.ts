import { FormGroup } from "@angular/forms";

export class ContactInfo {
    byEmail: boolean;
    bySms: boolean;

    email: string;
    smsPhone: string;
    phones: string;
    constructor(form:FormGroup){
        this.byEmail = form.controls.byEmail.value;
        this.bySms = form.controls.bySms.value;

        this.email = form.controls.email.value;
        this.smsPhone = form.controls.smsPhone.value;
        this.phones = form.controls.phones.value;
    }
}