import { FormGroup } from "@angular/forms";

export class ContactInfo {
    id: string;
    constructor(public byEmail: boolean, public bySms: boolean, public dontNotify: boolean,
        public email: string, public smsPhone: string, public phones: string) {
    }

    static buildByForm(form?: FormGroup): ContactInfo {
        if (!form) return this.buildEmpty();
        return new ContactInfo(form.controls.byEmail.value, form.controls.bySms.value, form.controls.dontNotify.value,
            form.controls.email.value, form.controls.smsPhone.value, form.controls.phones.value);
    }

    static cast(contactInfo?: ContactInfo): ContactInfo {
        let result = this.buildEmpty();
        if (!contactInfo) return result;
        
        for (const key in contactInfo) {
            if (contactInfo.hasOwnProperty(key)) {
                result[key] = contactInfo[key];
            }
        }
        return result;
    }

    private static buildEmpty(): ContactInfo {
        return new ContactInfo(false, false, false, undefined, undefined, undefined);
    }
}