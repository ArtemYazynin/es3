import { FormGroup } from "@angular/forms";

export class AgeGroup {
    IsSearchYoungerAge: boolean = false;
    IsSearchSelfAge: boolean = false;
    IsSearchOlderAge: boolean = false;
    static constructFromForm(form: FormGroup): AgeGroup {
        if (!form) return;
        let result = new AgeGroup();
        form.controls.selectedItems.value.forEach(name => {
            result[name] = true;
        });
        return result;
    }
}