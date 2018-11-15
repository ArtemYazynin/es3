import { Specialization } from "./specialization.model";
import { EducProgram } from "./educ-program.model";
import { FormGroup } from "@angular/forms";

export class SchoolInquiryInfo {
    id: string;
    constructor(public educYear: number,
        public grade: number,
        public specialization?: Specialization,
        public program?: EducProgram) {

    }

    private static buildEmpty(): SchoolInquiryInfo {
        return new SchoolInquiryInfo(undefined, undefined, undefined, undefined);
    }

    static cast(schoolInquiryInfo?: SchoolInquiryInfo): SchoolInquiryInfo {
        let result = this.buildEmpty();
        if (!schoolInquiryInfo) return result;

        for (const key in schoolInquiryInfo) {
            if (schoolInquiryInfo.hasOwnProperty(key)) {
                result[key] = schoolInquiryInfo[key];
            }
        }
        return result;
    }

    static buildByForm(form?: FormGroup): SchoolInquiryInfo {
        if (!form) return this.buildEmpty();
        return new SchoolInquiryInfo(form.controls.educYear.value, form.controls.grade.value, form.controls.specialization.value,
            form.controls.program.value.id ? form.controls.program.value : undefined);
    }
}
