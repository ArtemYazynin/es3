import { Entity } from "./entity";
import { EducProgramType } from "../educ-program-type.enum";

export class EducProgram extends Entity<string>{
    constructor(id: string, name: string, public shortName: string, public educProgramType: EducProgramType) {
        super(id, name)
    }
}
