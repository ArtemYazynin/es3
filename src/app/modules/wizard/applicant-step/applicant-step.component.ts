import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Applicant, ApplicantType, AttachmentType, ButtonsTitles, ConfigsOfRoutingButtons, DublicatesFinder, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditConfirmationDocumentComponent } from '../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../../inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-applicant-step',
  providers: [ActionsButtonsService],
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ApplicantStepComponent implements OnInit {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent;
  @ViewChild(EditConfirmationDocumentComponent) editConfirmationDocumentComponent: EditConfirmationDocumentComponent;

  constructor(private router: Router, private route: ActivatedRoute, private storageService: WizardStorageService) {
  }

  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;
  personTypes = PersonType;
  attachmentTypes = AttachmentType;

  ngOnInit() {
    this.config = this.getConfig();
  }

  private getConfig() {
    return new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const applicant = this.getApplicant();
        if (this.hasDublicates(applicant)) return;
        this.updateInquiry(applicant);
        this.router.navigate([this.getUrl()], { relativeTo: this.route });
      },
      () => {
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      }
    );
  }

  private getUrl() {
    const prev = "../";
    if (this.inquiry.applicantType == ApplicantType.Parent) {
      return `${prev}contactInfoStep`
    } else {
      return `${prev}parentStep`
    }
  }

  private getApplicant(): Applicant {
    const fullnameResult = this.editPersonComponent.fullnameComponent.getResult();
    const applicant = new Applicant(fullnameResult.lastname, fullnameResult.firstname, fullnameResult.middlename,
      this.editPersonComponent.snilsComponent.snils, fullnameResult.noMiddlename, undefined, undefined, undefined);
    applicant.identityCard = this.editPersonComponent.identityCardComponent.getResult();
    applicant.applicantRepresentParentDocument = this.editConfirmationDocumentComponent.getResult();
    const citizenshipsWithAddresses = this.editCitizenshipsComponent.getResult();
    applicant.countryStateApplicantDocument = citizenshipsWithAddresses.document;
    applicant.citizenships = citizenshipsWithAddresses.citizenships;
    Object.assign(applicant, citizenshipsWithAddresses.addresses);
    return applicant;
  }

  private hasDublicates(applicant: Applicant) {
    if (DublicatesFinder.betweenApplicantParent(applicant, this.inquiry.parent)
      || DublicatesFinder.betweenApplicantChildren(applicant, this.inquiry.children)
      || DublicatesFinder.betweenChildren(this.inquiry.children)) {
      return true;
    }
    return false;
  }

  private updateInquiry(applicant: Applicant) {
    if (this.inquiry.applicant) {
      Object.assign(this.inquiry.applicant, applicant);
    } else {
      this.inquiry.applicant = applicant;
    }
    this.storageService.set(this.inquiry.type, this.inquiry);
  }

  isValid() {
    const isValidPerson = this.editPersonComponent.isValid();
    const isValidCitizenships = this.editCitizenshipsComponent.isValid();
    const isValidDocument = this.editConfirmationDocumentComponent.isValid();
    return isValidPerson && isValidCitizenships && isValidDocument;
  }
}
