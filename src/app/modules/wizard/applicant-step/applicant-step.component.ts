import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, CommonService, DublicatesFinder, Inquiry, InquiryService } from '../../../shared/index';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantStepComponent implements OnInit, AfterViewInit, StepBase {

  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;

  constructor(private router: Router, private inquiryService: InquiryService,
    private route: ActivatedRoute, private storageService: WizardStorageService,
    private commonService: CommonService, private cdr: ChangeDetectorRef) { }

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  applicantTypes = ApplicantType;

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  isValid(): boolean {
    return this.editPersonComponent.isValid();
  }
  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
    },
    next: () => {
      this.inquiryService.saveApplicant(this.inquiry, this.editPersonComponent, (patch) => {
        this.storageService.set(this.inquiryType, patch);
      });

      if (this.inquiry.applicantType == ApplicantType.Parent) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../parentStep"], { relativeTo: this.route });
      }
    }
  }
}
