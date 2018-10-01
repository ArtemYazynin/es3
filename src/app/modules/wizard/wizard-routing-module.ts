import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChildrenStepComponent } from './children-step/children-step.component';
import { BaseResolver } from '../../shared/base-resolver';
import { ApplicantTypeStepComponent } from './applicant-type-step/applicant-type-step.component';
import { ParentStepComponent } from './parent-step/parent-step.component';
import { ApplicantStepComponent } from './applicant-step/applicant-step.component';
import { CurrentEducationPlaceStepComponent } from './current-education-place-step/current-education-place-step.component';
import { ContactInfoStepComponent } from './contact-info-step/contact-info-step.component';
import { PrivilegeStepComponent } from './privilege-step/privilege-step.component';
import { PrivilegeStepResolver } from './resolvers/privilege-step-resolver';
import { InquiryInfoStepComponent } from './inquiry-info-step/inquiry-info-step.component';
import { SchoolInquiryInfoStepComponent } from './school-inquiry-info-step/school-inquiry-info-step.component';
import { PreschoolInstitutionStepComponent } from './preschool-institution-step/preschool-institution-step.component';
import { FileAttachmentStepComponent } from './file-attachment-step/file-attachment-step.component';
import { PreviewStepComponent } from './preview-step/preview-step.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'childrenStep',
        pathMatch: 'full'
    },
    {
        path: "applicantTypeStep",
        component: ApplicantTypeStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "parentStep",
        component: ParentStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "applicantStep",
        component: ApplicantStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "childrenStep",
        component: ChildrenStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "currentEducationPlaceStep",
        component: CurrentEducationPlaceStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "contactInfoStep",
        component: ContactInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "privilegeStep",
        component: PrivilegeStepComponent,
        resolve: {
            resolved: PrivilegeStepResolver
        }
    },
    {
        path: "inquiryInfoStep",
        component: InquiryInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "schoolInquiryInfoStep", 
        component: SchoolInquiryInfoStepComponent
    },
    {
        path: "preschoolInstitutionStep",
        component: PreschoolInstitutionStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "fileAttachmentStep",
        component: FileAttachmentStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "previewStep",
        component: PreviewStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: "registerComplete/:id",
        component: RegisterCompleteComponent,
        resolve: {
            resolved: RegisterCompleteResolver
        }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WizardRoutingModule {
}
