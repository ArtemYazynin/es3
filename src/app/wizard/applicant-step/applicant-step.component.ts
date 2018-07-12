import { Component, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Person, Parent, FormService, CitizenshipService, Country, WizardStorageService, ApplicantType, AttachmentType, ConfirmationDocument } from '../../shared/index';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { isNullOrUndefined } from 'util';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-applicant-step',
  templateUrl: './applicant-step.component.html',
  styleUrls: ['./applicant-step.component.css']
})
export class ApplicantStepComponent implements OnInit {
  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  // @ViewChild(ConfirmationDocumentComponent)
  // confirmationDocumentComponent: ConfirmationDocumentComponent

  @ViewChild(FullNameComponent)
  fullnameComponent: FullNameComponent

  @ViewChildren(ConfirmationDocumentComponent)
  confirmationDocuments: QueryList<ConfirmationDocumentComponent>

  constructor(private fb: FormBuilder, private formService: FormService,
    private citizenshipService: CitizenshipService, private router: Router,
    private activatedRoute: ActivatedRoute, private storageService: WizardStorageService) { }

  countryStateApplicant = AttachmentType.CountryStateApplicantDocument;
  applicantRepresentParent = AttachmentType.ApplicantRepresentParent;

  countries: Array<Country> = [];
  applicantForm: FormGroup;
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());
  isAvailable = {
    countryStateDocument: () => {
      return this.applicantForm.value.citizenship && parseInt(this.applicantForm.value.citizenship) !== this.countries.find(x => x.name === "Россия").id;
    }
  }
  isValid(): boolean {
    let isValid = {
      applicantForm: this.applicantForm && this.applicantForm.valid || false,
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      countryStateDocument: (() => {
        if (!this.confirmationDocuments || this.countries.length == 0) return false;
        if (parseInt(this.applicantForm.value.citizenship) === this.countries.find(x => x.name === "Россия").id)
          return true;
        let component = this.confirmationDocuments.find(x => x.type == AttachmentType.CountryStateApplicantDocument)
        return component && component.confirmationDocumentForm &&component.confirmationDocumentForm.valid;
      })(),
      applicantRepresentDocumentForm: (() => {
        if (!this.confirmationDocuments) return false;
        let component = this.confirmationDocuments.find(x => x.type == AttachmentType.ApplicantRepresentParent);
        return component && component.confirmationDocumentForm && component.confirmationDocumentForm.valid
      })()
    }
    return isValid.applicantForm
      && isValid.fullnameForm
      && isValid.identityCardForm
      && isValid.countryStateDocument
      && isValid.applicantRepresentDocumentForm;
  }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .subscribe(result => {
        this.countries = result;
      });
    this.buildForm();
  }
  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {
      if (this.storageService.request.applicantType == ApplicantType["Законный представитель ребенка"]) {
        this.router.navigate(["../contactInfoStep"], { relativeTo: this.activatedRoute });
      } else {
        this.router.navigate(["../childrenStep"], { relativeTo: this.activatedRoute });
      }
    }
  }
  private buildForm() {
    this.applicantForm = this.fb.group({
      "snils": [
        "222-222-222 43",
        [
          Validators.required,
          Validators.maxLength(28),
          Validators.pattern("^\\d{3}-\\d{3}-\\d{3}\\s\\d{2}$")
        ]
      ],
      "citizenship": [
        "",
        [
          Validators.required
        ]
      ]
    });
    this.applicantForm.valueChanges
      .subscribe(data => this.formService.onValueChange(this.applicantForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.applicantForm, this.formErrors, this.validationMessages);
  }
}
