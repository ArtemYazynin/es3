import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Params } from "@angular/router";
import { Injectable } from "@angular/core";
import { WizardStorageService } from "../modules/wizard/shared/wizard-storage.service";
import { Inquiry } from "./models/inquiry.model";
import { LoaderService } from './loader.service';

@Injectable()
export class BaseResolver implements Resolve<{ inquiry: Inquiry }>{
    constructor(private storageService: WizardStorageService, private loaderService: LoaderService) {

    }
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        //this.loaderService.show();
        return {
            inquiry: <Inquiry>this.storageService.get(route.params.type)
        }
    }
}
