import { Entity } from "./entity.model";
import { EducProgram } from "./educ-program.model";
import { Group } from "./group.model";

export class Institution extends Entity<string>{
    private _programs: Array<EducProgram>;
    private _groups: Array<Group>;
    constructor(id: string, name: string, public institutionType: number) {
        super(id, name)
    }

    get programs(): Array<EducProgram> {
        return this._programs || [];
    }
    set programs(programs: Array<EducProgram>) {
        this._programs = programs || [];
    }

    get groups() {
        return this._groups || [];
    }
    set groups(groups: Array<Group>) {
        this._groups = groups || [];
    }
}
