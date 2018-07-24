import { DistributionParams } from "./distribution-params";
import { StayMode } from "./stay-mode";
import { AgeGroup } from "./age-group";

export class InquiryInfo {
    constructor(public distributionParams:DistributionParams, public stayMode:StayMode, public ageGroup:AgeGroup){ }
}
