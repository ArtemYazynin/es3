import { IdentityCard } from "./identityCard";
import { Person } from "./person";


export class Representative extends Person{
    public IdentityCard: IdentityCard;
    public citizenship: string;
    public relationType: string;

    constructor(){
        super();
        this.IdentityCard = new IdentityCard();
    }
}
