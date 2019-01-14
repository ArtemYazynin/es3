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
import { PreschoolInquiryInfoStepComponent } from './preschool-inquiry-info-step/preschool-inquiry-info-step.component';
import { SchoolInquiryInfoStepComponent } from './school-inquiry-info-step/school-inquiry-info-step.component';
import { InstitutionStepComponent } from './institution-step/institution-step.component';
import { FileAttachmentStepComponent } from './file-attachment-step/file-attachment-step.component';
import { RegisterCompleteComponent } from './register-complete/register-complete.component';
import { RegisterCompleteResolver } from '../../shared/register-complete-resolver';
import { InquiryViewResolver } from '../../shared/inquiry-view-resolver';
import { InquiryViewComponent } from '../../shared/components/inquiry-view/inquiry-view.component';

const typeSegment = ":type"
const routes: Routes = [
    {
        path: `${typeSegment}`,
        redirectTo:':type/childrenStep',
        pathMatch: 'full'
    },
    {
        path: `${typeSegment}/applicantTypeStep`,
        component: ApplicantTypeStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/parentStep`,
        component: ParentStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/applicantStep`,
        component: ApplicantStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/childrenStep`,
        component: ChildrenStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/currentEducationPlaceStep`,
        component: CurrentEducationPlaceStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/contactInfoStep`,
        component: ContactInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/privilegeStep`,
        component: PrivilegeStepComponent,
        resolve: {
            resolved: BaseResolver 
        }
    },
    {
        path: `${typeSegment}/preschoolInquiryInfoStep`,
        component: PreschoolInquiryInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/schoolInquiryInfoStep`,
        component: SchoolInquiryInfoStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/institutionStep`,
        component: InstitutionStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/fileAttachmentStep`,
        component: FileAttachmentStepComponent,
        resolve: {
            resolved: BaseResolver
        }
    },
    {
        path: `${typeSegment}/previewStep`,
        component: InquiryViewComponent,
        resolve: {
            resolved: InquiryViewResolver
        }
    },
    {
        path: `${typeSegment}/registerComplete/:id`,
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
