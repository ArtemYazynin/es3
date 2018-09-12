import { Routes } from "@angular/router";
import { ApplicantStepComponent } from "./applicant-step/applicant-step.component";
import { ApplicantTypeStepComponent } from "./applicant-type-step/applicant-type-step.component";
import { ChildrenStepComponent } from "./children-step/children-step.component";
import { ContactInfoStepComponent } from "./contact-info-step/contact-info-step.component";
import { CurrentEducationPlaceStepComponent } from "./current-education-place-step/current-education-place-step.component";
import { FileAttachmentStepComponent } from "./file-attachment-step/file-attachment-step.component";
import { InquiryInfoStepComponent } from "./inquiry-info-step/inquiry-info-step.component";
import { ParentStepComponent } from "./parent-step/parent-step.component";
import { PreschoolInstitutionStepComponent } from "./preschool-institution-step/preschool-institution-step.component";
import { PreviewStepComponent } from "./preview-step/preview-step.component";
import { PrivilegeStepComponent } from "./privilege-step/privilege-step.component";
import { RegisterCompleteComponent } from "./register-complete/register-complete.component";
import { BaseResolver } from "./resolvers/base-resolver";
import { PrivilegeStepResolver } from "./resolvers/privilege-step-resolver";
import { RegisterCompleteResolver } from "./resolvers/register-complete-resolver";
import { SchoolInquiryInfoStepComponent } from "./school-inquiry-info-step/school-inquiry-info-step.component";

export const wizardRoutes: Routes = [
    {
        path: "wizard/:type/applicantTypeStep",
        component: ApplicantTypeStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/parentStep",
        component: ParentStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/applicantStep",
        component: ApplicantStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/childrenStep",
        component: ChildrenStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/currentEducationPlaceStep",
        component: CurrentEducationPlaceStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/contactInfoStep",
        component: ContactInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/privilegeStep",
        component: PrivilegeStepComponent,
        resolve: {
            resolved: PrivilegeStepResolver
        }
    },
    {
        path: "wizard/:type/inquiryInfoStep",
        component: InquiryInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/schoolInquiryInfoStep", component: SchoolInquiryInfoStepComponent
    },
    {
        path: "wizard/:type/preschoolInstitutionStep",
        component: PreschoolInstitutionStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/fileAttachmentStep",
        component: FileAttachmentStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/previewStep",
        component: PreviewStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "wizard/:type/registerComplete/:id",
        component: RegisterCompleteComponent,
        resolve: {
            resolved: RegisterCompleteResolver
        }
    }
];