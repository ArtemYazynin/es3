import { Routes } from "@angular/router";
import { AddressComponent } from "./shared/address/address.component";
import { ApplicantStepComponent } from "./wizard/applicant-step/applicant-step.component";
import { ApplicantTypeStepComponent } from "./wizard/applicant-type-step/applicant-type-step.component";
import { ChildrenStepComponent } from "./wizard/children-step/children-step.component";
import { ContactInfoStepComponent } from "./wizard/contact-info-step/contact-info-step.component";
import { CurrentEducationPlaceStepComponent } from "./wizard/current-education-place-step/current-education-place-step.component";
import { FileAttachmentStepComponent } from "./wizard/file-attachment-step/file-attachment-step.component";
import { InquiryInfoStepComponent } from "./wizard/inquiry-info-step/inquiry-info-step.component";
import { ParentStepComponent } from "./wizard/parent-step/parent-step.component";
import { PreschoolInstitutionStepComponent } from "./wizard/preschool-institution-step/preschool-institution-step.component";
import { PreviewStepComponent } from "./wizard/preview-step/preview-step.component";
import { PrivilegeStepComponent } from "./wizard/privilege-step/privilege-step.component";
import { BaseResolver } from "./wizard/resolvers/base-resolver";
import { PrivilegeStepResolver } from "./wizard/resolvers/privilege-step-resolver";
import { SchoolInquiryInfoStepComponent } from "./wizard/school-inquiry-info-step/school-inquiry-info-step.component";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
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
    { path: "wizard/:type/schoolInquiryInfoStep", component: SchoolInquiryInfoStepComponent },
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
        path: "wizard/:type/addressTest",
        component: AddressComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];