import { DistributionParams } from "./distribution-params.model";
import { AgeGroup } from "./age-group.model";
import { StayMode } from "./stay-mode.model";
import { FormGroup } from "@angular/forms";

export class InquiryInfo {
    id:string;
    constructor(public distributionParams: DistributionParams, public stayMode: StayMode, public ageGroup: AgeGroup) { }

    private static buildEmpty(): InquiryInfo {
        return new InquiryInfo(undefined, undefined, undefined);
    }

    static cast(inquiryInfo?: InquiryInfo): InquiryInfo {
        let result = this.buildEmpty();
        if (!inquiryInfo) return result;

        for (const key in inquiryInfo) {
            if (inquiryInfo.hasOwnProperty(key)) {
                result[key] = inquiryInfo[key];
            }
        }
        return result;
    }
}
