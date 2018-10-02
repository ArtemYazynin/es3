import { Specialization } from "./specialization";
import { EducProgram } from "./educ-program";

export class SchoolInquiryInfo {
    constructor(public educYear: number, public grade: number, public specialization?: Specialization, public program?: EducProgram) {

    }
}
