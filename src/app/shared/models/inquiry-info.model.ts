import { DistributionParams } from "./distribution-params.model";
import { AgeGroup } from "./age-group.model";
import { StayMode } from "./stay-mode.model";

export class InquiryInfo {
    id:string;
    constructor(public distributionParams: DistributionParams, public stayMode: StayMode, public ageGroup: AgeGroup) { }
}
