import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'wizard',
        loadChildren: 'app/modules/wizard/wizard.module#WizardModule'
    },
    {
        path: 'inquiry',
        loadChildren: 'app/modules/inquiry/inquiry.module#InquiryModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}
