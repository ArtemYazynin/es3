import { Injectable } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BaseResolver } from "../../../shared/base-resolver";

@Injectable()
export class PrivilegeStepResolver extends BaseResolver {
    constructor(private fb: FormBuilder) {
        super();
    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let result = super.resolve(route, state);

        let form = this.fb.group({
            "withoutPrivilege": [
                false,
                []
            ],
            "privilegeOrder": [
                "",
                [Validators.required]
            ],
            "privilege": [
                "",
                []
            ]
        })
        const formErrors = {
            withoutPrivilege: "",
            privilegeOrder: "",
            privilege: ""
        };
        const validationMessages = {
            privilegeOrder: {
                "required": "Обязательное поле."
            },
            privilege: {
                "required": "Обязательное поле."
            }
        }
        result = Object.assign({}, result, { form: form });
        result = Object.assign({}, result, { formErrors: formErrors });
        result = Object.assign({}, result, { validationMessages: validationMessages });
        return result;
    }
}
