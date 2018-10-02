
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InquiryReadComponent } from './inquiry-read/inquiry-read.component';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
const routes: Routes = [
    {
        path: '',
        redirectTo: '',
        pathMatch: 'full',
    },
    {
        path: ":id",
        component: InquiryReadComponent,
        resolve: {
            resolved: RegisterCompleteResolver
        }
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InquiryRouting {
}
