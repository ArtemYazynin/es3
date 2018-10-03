import { Group } from "./group";
import { Institution } from "./institution";

export class SchoolClass extends Group{
    constructor(id: string, name: string, public vacancies: number, public capacityMax: number, public educYear:number,public institution?:Institution){
        super(id, name, vacancies, capacityMax, educYear, institution);
        
    }
}
