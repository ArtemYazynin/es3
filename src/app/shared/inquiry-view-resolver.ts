import { Injectable } from '@angular/core';
import { BaseResolver } from './base-resolver';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Theme } from './models/theme.enum';
import { BehaviorMode } from './behavior-mode.enum';

@Injectable()
export class InquiryViewResolver extends BaseResolver {
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let result = super.resolve(route, state);
        if (route.params && route.params.id) {
            Object.assign(result, {
                inquiryId: route.params.id,
                theme: Theme.Green,
                mode: BehaviorMode.Edit
            });
        } else {
            Object.assign(result, { theme: Theme.Blue, mode: BehaviorMode.Read });
        }
        return result;
    }
}
