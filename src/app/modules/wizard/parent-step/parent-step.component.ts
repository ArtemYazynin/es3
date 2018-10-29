import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService, inquiryType, Parent, DublicatesFinder } from '../../../shared';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../../inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { RelationTypeComponent } from '../../../shared/components/relation-type/relation-type.component';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;
  inquiry: Inquiry;
  agree: boolean = false;

  personTypes = PersonType;
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
        const fullnameResult = this.editPersonComponent.fullnameComponent.getResult();
        const parent = new Parent(fullnameResult.lastname, fullnameResult.firstname, fullnameResult.middlename, this.editPersonComponent.snilsComponent.snils,
          fullnameResult.noMiddlename, undefined, undefined, undefined);
        parent.identityCard = this.editPersonComponent.identityCardComponent.getResult();


        const citizenshipsWithAddresses = this.editCitizenshipsComponent.getResult();
        parent.countryStateDocument = citizenshipsWithAddresses.document;
        parent.citizenships = citizenshipsWithAddresses.citizenships;
        parent.relationType = this.relationTypeComponent.owner.relationType;
        parent.parentRepresentChildrenDocument = this.relationTypeComponent.editConfirmationDocumentComponent
          ? this.relationTypeComponent.editConfirmationDocumentComponent.getResult()
          : undefined;
        Object.assign(parent, citizenshipsWithAddresses.addresses);
        if (this.inquiry.applicantType == ApplicantType.Parent && DublicatesFinder.betweenParentChildren(parent, this.inquiry.children)) {
          return;
        } else if (this.inquiry.applicantType == ApplicantType.Applicant
          && (DublicatesFinder.betweenApplicantParent(this.inquiry.applicant, parent)
            || DublicatesFinder.betweenApplicantChildren(this.inquiry.applicant, this.inquiry.children)
            || DublicatesFinder.betweenParentChildren(parent, this.inquiry.children))) {
          return;
        }
        if (this.inquiry.parent) {
          Object.assign(this.inquiry.parent, parent);
        } else {
          this.inquiry.parent = parent;
        }

        this.storageService.set(this.inquiryType, this.inquiry);
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
