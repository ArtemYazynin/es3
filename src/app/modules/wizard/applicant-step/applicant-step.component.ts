import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, AttachmentType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditConfirmationDocumentComponent } from '../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../../inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared/index';

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

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService,
    private cdr: ChangeDetectorRef, private actionsButtonsService: ActionsButtonsService, private inquiryService: InquiryService) { }

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  config: ConfigsOfRoutingButtons;
  personTypes = PersonType;
  attachmentTypes = AttachmentType;
  applicantTypes = ApplicantType;

  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const inquiry = this.inquiryService.saveApplicant(this.inquiry, this.editPersonComponent, this.editCitizenshipsComponent, this.editConfirmationDocumentComponent);
        if (!inquiry) return;
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
