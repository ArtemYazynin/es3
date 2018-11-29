import { EducProgram } from "./educ-program.model";
import { Entity } from "./entity.model";
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

    static castArray(institutions?: Array<Institution>): Array<Institution> {
        let result = new Array<Institution>();
        if (!institutions) return result;
        else
            for (let i = 0; i < institutions.length; i++) {
                result.push(this.cast(institutions[i]));
            }
        return result;
    }

    private static cast(institution?: Institution): Institution {
        let result = this.buildEmpty();
        if (!institution) return result;
        else
            for (const key in institution) {
                if (result.hasOwnProperty(key)) {
                    result[key] = institution[key];
                }
            }
        return result;
    }

    private static buildEmpty(): Institution {
        return new Institution(undefined, undefined, undefined);
    }
}
