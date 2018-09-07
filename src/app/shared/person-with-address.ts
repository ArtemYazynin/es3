import { Address } from "./address";

export interface PersonWithAddress {
    register:Address;
    residential:Address;
    tempRegistrationExpired:Date;
    registerAddressLikeAsResidentialAddress:boolean;
}
