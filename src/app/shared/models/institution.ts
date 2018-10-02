import { Entity } from "./entity";
import { EducProgram } from "./educ-program";

export class Institution extends Entity<string>{
    private _programs: Array<EducProgram>;
    constructor(id: string, name: string, public institutionType: number) {
        super(id, name)
    }

    get programs(): Array<EducProgram> {
        return this._programs || [];
    }

    set programs(programs: Array<EducProgram>) {
        this._programs = programs || [];
    }
}
