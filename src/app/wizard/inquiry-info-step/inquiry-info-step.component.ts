import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AgeGroup, CompilationOfWizardSteps, DistributionParams, InquiryInfo, inquiryType, StayMode, StepBase, WizardStorageService } from '../../shared';
import { AgeGroupComponent } from '../../shared/age-group/age-group.component';
import { DistributionParamsComponent } from '../../shared/distribution-params/distribution-params.component';
import { StayModeComponent } from '../../shared/stay-mode/stay-mode.component';

@Component({
  selector: 'app-inquiry-info-step',
  templateUrl: './inquiry-info-step.component.html',
  styleUrls: ['./inquiry-info-step.component.css']
})
export class InquiryInfoStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(DistributionParamsComponent) distributionParamsComponent: DistributionParamsComponent;
  @ViewChild(StayModeComponent) stayModeComponent: StayModeComponent;
  @ViewChild(AgeGroupComponent) ageGroupComponent: AgeGroupComponent;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    const inquiry = <CompilationOfWizardSteps>this.storageService.get(this.inquiryType);
    if (!inquiry.inquiryInfo) return;
    this.distributionParamsComponent.inquiryInfoForm.patchValue({
      wishDate: inquiry.inquiryInfo.distributionParams.wishDate,
      specificity: inquiry.inquiryInfo.distributionParams.specificity,
      offerGeneralGroup: inquiry.inquiryInfo.distributionParams.offerGeneralGroup,
      offerCareGroup: inquiry.inquiryInfo.distributionParams.offerCareGroup,
      isSearchNear: inquiry.inquiryInfo.distributionParams.isSearchNear,
      isCanTempEnrolled: inquiry.inquiryInfo.distributionParams.isCanTempEnrolled
    });
    this.updateChild(inquiry.inquiryInfo.stayMode, this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
    this.updateChild(inquiry.inquiryInfo.ageGroup, this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
    this.cdr.detectChanges();
  }
  isValid() {
    let stayModeIsValid = this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form
      && this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form.valid;
    let ageGroupsIsValid = this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form
      && this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form.valid;
    let distributionParamsIsValid = this.distributionParamsComponent.inquiryInfoForm
      && this.distributionParamsComponent.inquiryInfoForm.valid;

    return distributionParamsIsValid && stayModeIsValid && ageGroupsIsValid;
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
      const inquiryInfo = (() => {
        const distributionParams = DistributionParams.constructFromForm(this.distributionParamsComponent.inquiryInfoForm);
        const stayMode = StayMode.constructFromForm(this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
        const ageGroup = AgeGroup.constructFromForm(this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
        return new InquiryInfo(distributionParams, stayMode, ageGroup);
      })();
      this.storageService.set(this.inquiryType, { inquiryInfo: inquiryInfo });
      this.router.navigate(["../preschoolInstitutionStep"], { relativeTo: this.route });
    }
  }

  private updateChild(obj: AgeGroup | StayMode, form: FormGroup) {
    if (!obj || !form || !form.controls || !form.controls.items) return;
    for (const property in obj) {
      if (!obj.hasOwnProperty(property)) continue;

      const formValue = obj[property];
      if (!formValue) continue;

      let control = form.controls.items["controls"].find((x: FormGroup) => x.value.id == property);
      if (!control) continue;

      let patch = Object.assign({}, control.value, { checkbox: true });
      control.patchValue(patch);
    }
  }
}
