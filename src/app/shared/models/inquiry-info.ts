import { DistributionParams } from "./distribution-params";
import { AgeGroup } from "./age-group";
import { StayMode } from "./stay-mode";

export class InquiryInfo {
    constructor(public distributionParams: DistributionParams, public stayMode: StayMode, public ageGroup: AgeGroup) { }
}
