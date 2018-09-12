import { Address } from "./address";

export interface PersonWithAddress {
    register:Address;
    residential:Address;
    tempRegistrationExpiredDate:Date;
    registerAddressLikeAsResidentialAddress:boolean;
}
