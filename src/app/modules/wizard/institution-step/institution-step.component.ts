import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType } from '../../../shared';
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
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const data = (() => {
          switch (this.inquiry.type) {
            case inquiryType.preschool:
              return {
                institutions: this.editInstitutionsComponent.selectedInstitutions
              };
            case inquiryType.school:
              return {
                schoolClasses: this.editInstitutionsComponent.selectedInstitutions,
                IsLearnEducCenter: this.editInstitutionsComponent.form.controls.IsLearnEducCenter.value
              }
            default:
              break;
          }
        })();
        this.storageService.set(this.inquiryType, data);
        this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
      },
      () => {
        const stepName = this.inquiry.type == inquiryType.preschool ? "inquiryInfoStep" : "schoolInquiryInfoStep";
        this.router.navigate([`../${stepName}`], { relativeTo: this.route });
      }
    );
  }
}
