import { Person } from "./person.model";
import { Institution } from "./institution.model";

export class Citizenship {
    id: string;
    person?: Person;
    code: number;
    institution?: Institution;
}