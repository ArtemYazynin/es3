import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditSchoolInquiryInfoComponent } from '../../../shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';
import { ButtonsTitles, ConfigsOfRoutingButtons, InquiryRequest, InquiryService } from '../../../shared/index';
import { StepBase, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-school-inquiry-info-step',
  templateUrl: './school-inquiry-info-step.component.html',
  styleUrls: ['./school-inquiry-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolInquiryInfoStepComponent implements OnInit, StepBase {
  @ViewChild(EditSchoolInquiryInfoComponent) editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent
  inquiry: InquiryRequest;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  config: ConfigsOfRoutingButtons;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        this.inquiryService.saveSchoolInquiryInfo(this.editSchoolInquiryInfoComponent, (patch) => {
          this.storageService.set(this.inquiryType, patch);
        })
        this.router.navigate(["../schoolInstitutionStep"], { relativeTo: this.route });
      },
      () => {
        this.router.navigate(["../privilegeStep"], { relativeTo: this.route });
      }
    );
  }

  isValid(): boolean {
    return this.editSchoolInquiryInfoComponent && this.editSchoolInquiryInfoComponent.isValid();
  }
}