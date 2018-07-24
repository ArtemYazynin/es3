import { FormGroup } from "@angular/forms";

export class StayMode {
    IsFullStay: boolean = false;
    IsNightStay: boolean = false;
    IsShortStay: boolean = false;
    IsReducedStay: boolean = false;
    IsExtendedStay: boolean = false;
    constructor() { }
    static constructFromForm(form: FormGroup): StayMode {
        if (!form) return;
        let result = new StayMode();
        form.controls.selectedItems.value.forEach(name => {
            result[name] = true;
        });
        return result;
    }
}