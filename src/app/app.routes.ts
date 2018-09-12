import { Routes } from "@angular/router";
export const routes: Routes = [
    {
        path: "",
        redirectTo: "",
        pathMatch: "full"
    },

    // {
    //     path: "inquiry/:id",
    //     component: InquiryReadComponentComponent,
    //     resolve: {
    //         resolved: BaseResolver
    //     }
    // }

    // { path: "products/edit/:id", component: ProductCreateEditComponent},
    // { path: "products/create", component: ProductCreateEditComponent},
    // { path: "products/delete/:id", component: ProductDeleteComponent}
];