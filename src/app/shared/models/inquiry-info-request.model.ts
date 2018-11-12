import { DistributionParams } from "./distribution-params.model";
import { AgeGroup } from "./age-group.model";
import { StayMode } from "./stay-mode.model";

export class InquiryInfoRequest {
    constructor(public distributionParams: DistributionParams, public stayMode: StayMode, public ageGroup: AgeGroup) { }
}

export class InquiryInfo {
    specificityId:string;
    offerGeneralGroup: boolean;
    offerCareGroup: boolean;
    isSearchNear: boolean;
    isCanTempEnrolled: boolean;
    
    IsFullStay: boolean;
    IsNightStay: boolean;
    IsShortStay: boolean;
    IsReducedStay: boolean;
    IsExtendedStay: boolean;

    IsSearchYoungerAge: boolean;
    IsSearchSelfAge: boolean;
    IsSearchOlderAge: boolean;


    /* school inquiry info */
    educYear: number;
    grade: number;
    specializationId: string;
    educProgramId: string;
}
