import { ValidatorFn } from "@angular/forms";

export class ControlInfo {
    constructor(public name: string, 
        public validators: ValidatorFn[]) { }
}