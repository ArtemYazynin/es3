import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from "@angular/router";

export class BaseResolver implements Resolve<{ inquiryType: string }>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {       
        return {
            inquiryType: route.params.type
        }
    }
}
