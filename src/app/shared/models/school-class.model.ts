import { Institution } from '..';
import { Group } from "./group.model";

export class SchoolClass extends Group {
    constructor(id: string, name: string, public vacancies: number, public capacityMax: number, public educYear: number, public institution?: Institution) {
        super(id, name, vacancies, capacityMax, educYear, institution);

    }

    static castArray(schoolClasses?: Array<SchoolClass>): Array<SchoolClass> {
        let result = new Array<SchoolClass>();
        if (!schoolClasses) return result;
        else
            for (let i = 0; i < schoolClasses.length; i++) {
                result.push(this.cast(schoolClasses[i]));
            }
        return result;
    }

    private static cast(schoolClass?: SchoolClass): SchoolClass {
        let result = this.buildEmpty();
        if (!schoolClass) return result;
        else
            for (const key in schoolClass) {
                if (result.hasOwnProperty(key)) {
                    result[key] = schoolClass[key];
                }
            }
        return result;
    }

    private static buildEmpty(): SchoolClass {
        return new SchoolClass(undefined, undefined, undefined, undefined, undefined, undefined);
    }
}
