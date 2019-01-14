
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryViewResolver } from '../../shared/inquiry-view-resolver';
import { InquiryViewComponent } from '../../shared/components/inquiry-view/inquiry-view.component';
const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: ":id",
        component: InquiryViewComponent,
        resolve: {
            resolved: InquiryViewResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InquiryRouting {
}
