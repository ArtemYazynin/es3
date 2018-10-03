import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, CitizenshipService, CommonService, FormService, Inquiry, InquiryService, inquiryType } from '../../../shared';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared';


@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;

  inquiry: Inquiry;
  agree: boolean = false;

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;

  constructor(private storageService: WizardStorageService, private commonService: CommonService, private formService: FormService, private inquiryService: InquiryService,
    private citizenshipService: CitizenshipService, private cdr: ChangeDetectorRef,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    if (this.inquiry)
      this.agree = true;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  isValid(): boolean {
    return this.agree && this.editPersonComponent.isValid();
  }

  goTo = {
    back: () => {
      if (this.inquiry.applicantType == ApplicantType.Applicant) {
        this.router.navigate(["../applicantStep"], { relativeTo: this.route });
      } else {
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      }
    },
    next: () => {
      this.inquiryService.saveParent(this.inquiry, this.editPersonComponent, (patch) => {
        this.storageService.set(this.inquiryType, patch);
      })
      this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
    }
  }
}
