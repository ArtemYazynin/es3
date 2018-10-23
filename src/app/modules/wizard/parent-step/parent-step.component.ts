import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService, inquiryType } from '../../../shared';
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
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private inquiryService: InquiryService, private cdr: ChangeDetectorRef,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        this.inquiryService.saveParent(this.inquiry, this.editPersonComponent, (patch) => {
          this.storageService.set(this.inquiryType, patch);
        })
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
      },
      () => {
        if (this.inquiry.applicantType == ApplicantType.Applicant) {
          this.router.navigate(["../applicantStep"], { relativeTo: this.route });
        } else {
          this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
        }
      }
    );
    if (this.inquiry.parent)
      this.agree = true;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
}
