import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquiry, inquiryType } from '../../../shared';
import { EditInstitutionsComponent } from '../../inquiry/shared/components/edit-institutions/edit-institutions.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  selector: 'app-institution-step',
  templateUrl: './institution-step.component.html',
  styleUrls: ['./institution-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionStepComponent implements OnInit, StepBase {
  @ViewChild(EditInstitutionsComponent) editInstitutionsComponent: EditInstitutionsComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiry: Inquiry;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }

  goTo = {
    back: () => {
      this.router.navigate(["../inquiryInfoStep"], { relativeTo: this.route });
    },
    next: () => {
      const data = (() => {
        switch (this.inquiry.type) {
          case inquiryType.preschool:
            return { institutions: this.editInstitutionsComponent.selectedInstitutions };
          case inquiryType.school:
            return { schoolClasses: this.editInstitutionsComponent.selectedInstitutions }
          default:
            break;
        }
      })();
      this.storageService.set(this.inquiryType, data);
      this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
    }
  };
  isValid(): boolean {
    return this.editInstitutionsComponent.isValid();
  }
}
