import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from "@angular/forms";
import { Subscription } from 'rxjs/_esm5';
import { forkJoin } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  IdentityCardType,
  IdentityCard,
  Person,
  Parent,
  FormService,
  CitizenshipService,
  RelationTypeService,
  ApplicantType,
  ConfirmationDocument,
  RelationType,
  Country,
  WizardStorageService
} from "../../shared/index";
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { BirthInfoComponent } from '../../person/birth-info/birth-info.component';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit {
  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  @ViewChild(ConfirmationDocumentComponent)
  confirmationDocumentComponent: ConfirmationDocumentComponent

  @ViewChild(FullNameComponent)
  fullnameComponent: FullNameComponent

  @ViewChild(BirthInfoComponent)
  birthInfoComponent: BirthInfoComponent

  private inquiryType: string;

  parentForm: FormGroup;
  relationTypes: Array<RelationType> = [];
  countries: Array<Country> = [];

  isValid(): boolean {
    let isValid = {
      parentForm: this.parentForm && this.parentForm.valid || false,
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: (()=>{
        if (this.storageService.request.applicantType !== ApplicantType["Лицо, подающее заявление о приёме самого себя"]) {
          return true;
        }
        return this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false;
      })(),
      countryStateForm: (() => {
        if (!this.parentForm || !this.parentForm.valid) return false;
        if (isNullOrUndefined(this.parentForm.value.citizenship) || this.parentForm.value.citizenship === "") return false;
        if (parseInt(this.parentForm.value.citizenship) === this.countries.find(x => x.name === "Россия").id) return true;
        return this.confirmationDocumentComponent
          && this.confirmationDocumentComponent.confirmationDocumentForm
          && this.confirmationDocumentComponent.confirmationDocumentForm.valid
          || false;
      })()
    }
    return isValid.parentForm
      && isValid.fullnameForm
      && isValid.identityCardForm
      && isValid.birthInfoForm
      && isValid.countryStateForm;
  }
  isAvailable = {
    countryStateDocument: () => {
      return this.parentForm.value.citizenship && parseInt(this.parentForm.value.citizenship) !== this.countries.find(x => x.name === "Россия").id;
    },
    representChildrenInterestsDocument: () => {
      let relationType = this.relationTypes.find(x => x.id === this.parentForm.value.relationType);
      return relationType ? relationType.confirmationDocument : false;
    },
    relationType: false,
    childApplicantInfo: false
  }
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());

  constructor(private fb: FormBuilder,
    private formService: FormService,
    private storageService: WizardStorageService,
    private citizenshipService: CitizenshipService,
    private relationTypeService: RelationTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.isAvailable.relationType = this.storageService.request.applicantType !== ApplicantType["Лицо, подающее заявление о приёме самого себя"];
    this.isAvailable.childApplicantInfo = this.storageService.request.applicantType === ApplicantType["Лицо, подающее заявление о приёме самого себя"];
    forkJoin([this.citizenshipService.getCountries(), this.relationTypeService.get()])
      .subscribe(results => {
        this.countries = results[0];
        this.relationTypes = results[1];

        this.buildForm();
      });

    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });
  }

  private buildForm() {
    this.parentForm = this.fb.group({
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
      ],
      "relationType": [
        this.relationTypes[0].id,
        []
      ],
      "agree": [
        false,
        [Validators.requiredTrue]
      ]
    });
    this.parentForm.valueChanges
      .subscribe(data => this.formService.onValueChange(this.parentForm, this.formErrors, this.validationMessages));

    this.formService.onValueChange(this.parentForm, this.formErrors, this.validationMessages);
  }

  goTo = {
    back: () => {
      this.router.navigate(["../applicantTypeStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {
      if (!this.parentForm.valid || !this.identityCardComponent.identityCardForm.valid) return;

      this.storageService.parent = (() => {
        let result = <Parent>this.parentForm.value;
        result.IdentityCard = <IdentityCard>this.identityCardComponent.identityCardForm.value;
        if (this.isAvailable.countryStateDocument()) {
          result.countryStateDocument = <ConfirmationDocument>this.confirmationDocumentComponent.confirmationDocumentForm.value;
        }
        if (this.isAvailable.representChildrenInterestsDocument()) {
          result.representChildrenInterestsDocument = <ConfirmationDocument>this.confirmationDocumentComponent.confirmationDocumentForm.value;
        }
        return result;
      })();
      let segment: string = (() => {
        switch (this.storageService.request.applicantType) {
          case ApplicantType["Родитель/Опекун"]:
            return "childrenStep";
          case ApplicantType["Лицо, подающее заявление о приёме самого себя"]:
            return "contactsStep";
          case ApplicantType["Лицо, действующее от имени законного представителя"]:
            return "applicantStep";
          default:
            break;
        }
      })();
      this.router.navigate(["../"+segment], { relativeTo: this.activatedRoute });
    }
  }
}
