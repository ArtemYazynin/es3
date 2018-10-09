import { Group } from "./group.model";
import { Institution } from "./institution.model";

export class SchoolClass extends Group{
    constructor(id: string, name: string, public vacancies: number, public capacityMax: number, public educYear:number,public institution?:Institution){
        super(id, name, vacancies, capacityMax, educYear, institution);
        
    }
}
