import { Routes } from "@angular/router";
import { ApplicantTypeStepComponent } from "./wizard/applicant-type-step/applicant-type-step.component";
import { ParentStepComponent } from "./wizard/parent-step/parent-step.component";
import { ApplicantStepComponent } from "./wizard/applicant-step/applicant-step.component";
import { ChildrenStepComponent } from "./wizard/children-step/children-step.component";
import { CurrentEducationPlaceStepComponent } from "./wizard/current-education-place-step/current-education-place-step.component";
import { ContactInfoStepComponent } from "./wizard/contact-info-step/contact-info-step.component";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    { path: "wizard/:type/applicantTypeStep", component: ApplicantTypeStepComponent },
    { path: "wizard/:type/parentStep", component: ParentStepComponent },
    { path: "wizard/:type/applicantStep", component:ApplicantStepComponent },
    { path: "wizard/:type/childrenStep", component: ChildrenStepComponent },
    { path: "wizard/:type/currentEducationPlaceStep", component: CurrentEducationPlaceStepComponent },
    { path: "wizard/:type/contactInfoStep", component: ContactInfoStepComponent }
    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];