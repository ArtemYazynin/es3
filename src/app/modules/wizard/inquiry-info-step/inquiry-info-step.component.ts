import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeGroup, DistributionParams, Inquiry, InquiryInfo, inquiryType, StayMode, InquiryService } from '../../../shared';
import { EditInquiryInfoComponent } from '../../inquiry/shared/components/edit-inquiry-info/edit-inquiry-info.component';
import { StepBase, WizardStorageService } from '../shared';


@Component({
  selector: 'app-inquiry-info-step',
  templateUrl: './inquiry-info-step.component.html',
  styleUrls: ['./inquiry-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryInfoStepComponent implements OnInit, StepBase {
  @ViewChild(EditInquiryInfoComponent) editInquiryInfoComponent: EditInquiryInfoComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiry: Inquiry;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }
  isValid() {
    return this.editInquiryInfoComponent.isValid();
  }
  goTo = {
    back: () => {
      if (this.inquiryType == inquiryType.profEducation) {
        this.router.navigate(["../marksStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../privilegeStep"], { relativeTo: this.route });
      }
    },
    next: () => {
      this.inquiryService.saveInquiryInfo(this.editInquiryInfoComponent, (patch) => {
        this.storageService.set(this.inquiryType, patch);
      })
      this.router.navigate(["../preschoolInstitutionStep"], { relativeTo: this.route });
    }
  }


}
