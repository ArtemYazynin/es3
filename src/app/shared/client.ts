import { IdentityCard } from "./identityCards/identityCard";
import { Person } from "./person";

export class Client extends Person{  
    public IdentityCards: Array<IdentityCard>;
    constructor(){
        super();
        this.IdentityCards= [];
    }
}