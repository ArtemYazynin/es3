import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AgeGroup, InquiryInfo, StayMode } from '../../../../../shared';
import { AgeGroupComponent } from '../../../../../shared/components/age-group/age-group.component';
import { DistributionParamsComponent } from '../../../../../shared/components/distribution-params/distribution-params.component';
import { StayModeComponent } from '../../../../../shared/components/stay-mode/stay-mode.component';

@Component({
  selector: 'app-edit-inquiry-info',
  templateUrl: './edit-inquiry-info.component.html',
  styleUrls: ['./edit-inquiry-info.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditInquiryInfoComponent implements OnInit, AfterViewInit {
  @ViewChild(DistributionParamsComponent) distributionParamsComponent: DistributionParamsComponent;
  @ViewChild(StayModeComponent) stayModeComponent: StayModeComponent;
  @ViewChild(AgeGroupComponent) ageGroupComponent: AgeGroupComponent;

  @Input() inquiryInfo: InquiryInfo;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {

  }
  ngAfterViewInit(): void {
    if (!this.inquiryInfo) return;
    this.updateChild(this.inquiryInfo.stayMode, this.stayModeComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
    this.updateChild(this.inquiryInfo.ageGroup, this.ageGroupComponent.atLeastOneCheckboxShouldBeSelectedComponent.form);
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
