import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StepBase, WizardStorageService } from '../shared/index';
import { CommonService, SpecializationService, EducProgramService, SchoolInquiryInfo, Inquiry } from '../../../shared/index';
import { EditSchoolInquiryInfoComponent } from '../../../shared/components/edit-school-inquiry-info/edit-school-inquiry-info.component';

@Component({
  selector: 'app-school-inquiry-info-step',
  templateUrl: './school-inquiry-info-step.component.html',
  styleUrls: ['./school-inquiry-info-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SchoolInquiryInfoStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditSchoolInquiryInfoComponent) editSchoolInquiryInfoComponent: EditSchoolInquiryInfoComponent
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
  }

  ngAfterViewInit(): void {

  }

  isValid(): boolean {
    return this.editSchoolInquiryInfoComponent && this.editSchoolInquiryInfoComponent.isValid();
  }
  goTo = {
    back: () => {
      this.router.navigate(["../privilegeStep"], { relativeTo: this.route });
    },
    next: () => {
      const schoolInquiryInfo = new SchoolInquiryInfo(this.editSchoolInquiryInfoComponent.form.controls.educYear.value,
        this.editSchoolInquiryInfoComponent.form.controls.grade.value, this.editSchoolInquiryInfoComponent.form.controls.specialization.value,
        this.editSchoolInquiryInfoComponent.form.controls.program.value.id ? this.editSchoolInquiryInfoComponent.form.controls.program.value : undefined);
      this.storageService.set(this.inquiryType, { schoolInquiryInfo: schoolInquiryInfo });
      this.router.navigate(["../schoolInstitutionStep"], { relativeTo: this.route });
    }
  };


}
