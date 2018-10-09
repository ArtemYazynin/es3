import { Entity } from "./entity.model";
import { Institution } from "./institution.model";

export class Group extends Entity<string>{
    constructor(id: string, name: string, public vacancies: number, public capacityMax: number, public educYear:number,public institution?:Institution) {
        super(id, name);
    }
}
