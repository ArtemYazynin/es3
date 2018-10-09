import { Specialization } from "./specialization.model";
import { EducProgram } from "./educ-program.model";

export class SchoolInquiryInfo {
    constructor(public educYear: number, 
        public grade: number, 
        public specialization?: Specialization, 
        public program?: EducProgram) {

    }
}
