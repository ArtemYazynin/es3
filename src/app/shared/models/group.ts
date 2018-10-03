import { Entity } from "./entity";
import { Institution } from "./institution";

export class Group extends Entity<string>{
    constructor(id: string, name: string, public vacancies: number, public capacityMax: number, public educYear:number,public institution?:Institution) {
        super(id, name);
    }
}
