import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { BaseResolver } from "./base-resolver";

@Injectable()
export class RegisterCompleteResolver extends BaseResolver {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let result = super.resolve(route, state);
        Object.assign(result, { inquiryId: route.params.id });
        return result;
    }
}
