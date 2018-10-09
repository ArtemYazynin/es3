import { Entity } from "./entity.model";
import { EducProgramType } from "../educ-program-type.enum";

export class EducProgram extends Entity<string>{
    constructor(id: string, name: string, public shortName: string, public educProgramType: EducProgramType) {
        super(id, name)
    }
}
