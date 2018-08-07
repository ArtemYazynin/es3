import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from "@angular/router";
import { Injectable } from "@angular/core";

@Injectable()
export class BaseResolver implements Resolve<{ inquiryType: string }>{
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {       
        return {
            inquiryType: route.params.type
        }
    }
}
