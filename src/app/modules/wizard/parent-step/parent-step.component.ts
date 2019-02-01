import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, DublicatesFinder, Inquiry, inquiryType, Parent } from '../../../shared';
import { RelationTypeComponent } from '../../../shared/components/relation-type/relation-type.component';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../../inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { WizardStorageService } from '../shared';

@Component({
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentStepComponent implements OnInit {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;

  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  agree: boolean = false;
  personTypes = PersonType;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.config = this.getConfig();
    if (this.inquiry.parent) this.agree = true;
  }

  private getConfig() {
    const navExtras = { relativeTo: this.route };
    return new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        let parent = this.getParent();
        if (this.hasDublicates(parent)) return;
        this.updateInquiry(parent);
        this.router.navigate(["../contactInfoStep"], navExtras);
      },
      () => {
        this.router.navigate([this.getUrl()], navExtras);
      }
    );
  }

  private getUrl(){
    const prev = "../";
    if (this.inquiry.applicantType == ApplicantType.Applicant) {
      return `${prev}applicantStep`;
    } else {
      return `${prev}applicantTypeStep`;
    }
  }

  private getParent() {
    const citizenshipsWithAddresses = this.editCitizenshipsComponent.getResult();
    const fullnameResult = this.editPersonComponent.fullnameComponent.getResult();
    const parentRepresentChildrenDocument = this.relationTypeComponent.editConfirmationDocumentComponent
      ? this.relationTypeComponent.editConfirmationDocumentComponent.getResult()
      : undefined;
    const parent = (() => {
      let person = new Parent(fullnameResult.lastname, fullnameResult.firstname, fullnameResult.middlename, this.editPersonComponent.snilsComponent.snils,
        fullnameResult.noMiddlename);
      person.identityCard = this.editPersonComponent.identityCardComponent.getResult();
      if (citizenshipsWithAddresses) {
        person.countryStateDocument = citizenshipsWithAddresses.document;
        person.citizenships = citizenshipsWithAddresses.citizenships;
        Object.assign(person, citizenshipsWithAddresses.addresses);
      }
      person.relationType = this.relationTypeComponent.owner.relationType;
      person.parentRepresentChildrenDocument = parentRepresentChildrenDocument;

      return person;
    })();
    return parent;
  }

  private hasDublicates(parent: Parent) {
    if (!parent || !this.inquiry || !this.inquiry.children) return true;
    if (this.inquiry.applicantType == ApplicantType.Parent && DublicatesFinder.betweenParentChildren(parent, this.inquiry.children)) {
      return true;
    }
    if (this.inquiry.applicantType == ApplicantType.Applicant
      && (DublicatesFinder.betweenApplicantParent(this.inquiry.applicant, parent)
        || DublicatesFinder.betweenApplicantChildren(this.inquiry.applicant, this.inquiry.children)
        || DublicatesFinder.betweenParentChildren(parent, this.inquiry.children))) {
      return true;
    }
    return false;
  }

  private updateInquiry(parent) {
    if (!parent) return;
    if (this.inquiry.parent) {
      Object.assign(this.inquiry.parent, parent);
    } else {
      this.inquiry.parent = Object.assign(new Parent("", "", "", "", false), parent);
    }

    this.storageService.set(this.inquiry.type, this.inquiry);
  }

  isValid() {
    const citizenshipsIsValid = this.editCitizenshipsComponent.isValid();
    const personIsValid = this.editPersonComponent.isValid();
    const relationTypeIsValid = this.relationTypeComponent.isValid()
    return citizenshipsIsValid
      && personIsValid
      && relationTypeIsValid
      && this.agree;
  }

}
