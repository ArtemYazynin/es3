import { Routes } from "@angular/router";
import { AppComponent } from './app.component';
import {WizardComponent} from "./wizard/wizard.component";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },
    { path: "wizard/preschool", component: WizardComponent },
    { path: "wizard/school", component: WizardComponent },
    { path: "wizard/healthCamp", component: WizardComponent },
    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];