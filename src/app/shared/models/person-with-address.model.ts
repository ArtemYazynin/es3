import { Address } from "./address.model";

export interface PersonWithAddress {
    register:Address;
    residential:Address;
    tempRegistrationExpiredDate:Date;
    registerAddressLikeAsResidentialAddress:boolean;
}
