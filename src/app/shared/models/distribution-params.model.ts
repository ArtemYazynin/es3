import { FormGroup } from "@angular/forms";
import { Specificity } from "./specificity.model";

export class DistributionParams {
    constructor(public wishDate: Date,
        public specificity: Specificity,
        public offerGeneralGroup: boolean,
        public offerCareGroup: boolean,
        public isSearchNear: boolean,
        public isCanTempEnrolled: boolean) {

    }
    static constructFromForm(form: FormGroup): DistributionParams {
        if (!form) return;
        return new DistributionParams(form.controls.wishDate.value, form.controls.specificity.value
            ? form.controls.specificity.value
            : undefined,
            form.controls.offerGeneralGroup.value,
            form.controls.offerCareGroup.value, form.controls.isSearchNear.value, form.controls.isCanTempEnrolled.value);
    }
}
