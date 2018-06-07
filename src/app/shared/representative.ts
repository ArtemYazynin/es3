import { IdentityCard } from "./identityCard";
import { Person } from "./person";


export class Representative extends Person{
    public IdentityCard: IdentityCard;
    public citizenship: string;
    constructor(){
        super();
        this.IdentityCard = new IdentityCard();
    }
}
