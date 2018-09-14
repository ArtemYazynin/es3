import { Routes } from "@angular/router";
import { InquiryReadComponent } from "./modules/inquiry/inquiry-read/inquiry-read.component";
import { RegisterCompleteResolver } from "./shared/register-complete-resolver";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },

    

    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];