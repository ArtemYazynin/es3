import { IdentityCard } from "../person/identity-card/shared/identityCard";
import { Person } from "./person";

export class Client extends Person{  
    public IdentityCards: Array<IdentityCard>;
    constructor(){
        super();
        this.IdentityCards= [];
    }
}