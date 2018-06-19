import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import { ApplicantTypeStepComponent } from "./wizard/applicant-type-step/applicant-type-step.component";
import { ParentStepComponent } from "./wizard/parent-step/parent-step.component";
import { ApplicantStepComponent } from "./wizard/applicant-step/applicant-step.component";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    { path: "wizard/:type/applicantTypeStep", component: ApplicantTypeStepComponent },
    { path: "wizard/:type/parentStep", component: ParentStepComponent },
    { path: "wizard/:type/applicantStep", component:ApplicantStepComponent }
    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];