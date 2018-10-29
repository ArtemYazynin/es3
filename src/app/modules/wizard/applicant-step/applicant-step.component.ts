import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, CommonService, ConfigsOfRoutingButtons, Inquiry, InquiryService, AttachmentType, Applicant, DublicatesFinder } from '../../../shared/index';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared/index';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../../inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditConfirmationDocumentComponent } from '../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent;
  @ViewChild(EditConfirmationDocumentComponent) editConfirmationDocumentComponent: EditConfirmationDocumentComponent;

  constructor(private router: Router, private inquiryService: InquiryService,
    private route: ActivatedRoute, private storageService: WizardStorageService,
    private commonService: CommonService, private cdr: ChangeDetectorRef) { }

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;
  personTypes = PersonType;
  attachmentTypes = AttachmentType;

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const inquiry = this.inquiryService.saveApplicant(this.inquiry, this.editPersonComponent, this.editCitizenshipsComponent, this.editConfirmationDocumentComponent);
        this.storageService.set(this.inquiryType, inquiry);

        if (this.inquiry.applicantType == ApplicantType.Parent) {
          this.router.navigate(["../contactInfoStep"], { relativeTo: this.route });
        } else {
          this.router.navigate(["../parentStep"], { relativeTo: this.route });
        }
      },
      () => {
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      }
    );
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  isValid() {
    return this.editPersonComponent.isValid() && this.editCitizenshipsComponent.isValid() && this.editConfirmationDocumentComponent.isValid();
  }
}
