import { Routes } from "@angular/router";
import { InquiryReadComponentComponent } from "./inquiry/inquiry-read-component/inquiry-read-component.component";
import { BaseResolver } from "./wizard/resolvers/base-resolver";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },

    {
        path: "inquiry/:id",
        component: InquiryReadComponentComponent,
        resolve: {
            resolved: BaseResolver
        }
    }

    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];