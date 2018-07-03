import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { forkJoin } from 'rxjs';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {
  IdentityCardType,
  IdentityCard,
  Parent,
  FormService,
  CitizenshipService,
  RelationTypeService,
  ApplicantType,
  ConfirmationDocument,
  RelationType,
  Country,
  WizardStorageService,
  Entity,
  ParentStepService
} from "../../shared/index";
import { IdentityCardComponent } from '../../person/identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { FullNameComponent } from '../../person/full-name/full-name.component';
import { BirthInfoComponent } from '../../person/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit {
  citships: Array<Entity<string>> = [];

  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;
  @ViewChild(ConfirmationDocumentComponent) confirmationDocumentComponent: ConfirmationDocumentComponent;
  @ViewChild(FullNameComponent) fullnameComponent: FullNameComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;

  parentForm: FormGroup;
  relationTypes: Array<RelationType> = [];
  groupOfIdentityCardTypeId: Array<number> = [
    IdentityCardType["Паспорт РФ"],
    IdentityCardType["Другой документ, удостоверяющий личность"],
    IdentityCardType["Свидетельство о рождении РФ"],
    IdentityCardType["Загранпаспорт гражданина РФ"],
    IdentityCardType["Удостоверение офицера"],
    IdentityCardType["Военный билет"],
    IdentityCardType["Временное удостоверение, выданное взамен военного билета"],
    IdentityCardType["Временное удостоверение личности гражданина РФ"],
    IdentityCardType["Иностранный паспорт"],
    IdentityCardType["Удостоверение личности лица без гражданства в РФ"],
    IdentityCardType["Удостоверение личности отдельных категорий лиц, находящихся на территории РФ,подавших заявление о признании гражданами РФ или о приеме в гражданство РФ"],
    IdentityCardType["Удостоверение беженца"],
    IdentityCardType["Удостоверение личности лица, ходатайствующего о признании беженцем на территории РФ"],
    IdentityCardType["Удостоверение личности лица, получившего временное убежище на территории РФ"],
    IdentityCardType["Вид на жительство"],
    IdentityCardType["Разрешение на временное проживание в РФ"],
    IdentityCardType["Свидетельство о рассмотрении ходатайства о признании лица беженцем на территории РФ по существу"],
    IdentityCardType["Свидетельство о предоставлении временного убежища на территории Российской Федерации"],
    IdentityCardType["Свидетельство о рождении, выданное уполномоченным органом иностранного государства"]
  ];
  countries: Array<Country> = [];
  inquiryType: string;
  isValid(): boolean {
    let isValid = {
      parentForm: this.parentForm && this.parentForm.valid || false,
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: (() => {
        if (this.storageService.request.applicantType !== ApplicantType["Ребенок-заявитель"]) {
          return true;
        }
        return this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false;
      })(),
      countryStateForm: (() => {
        if (!this.parentForm || !this.parentForm.valid) return false;
        if (this.confirmationDocumentComponent
          && this.confirmationDocumentComponent.confirmationDocumentForm
          || false) {
          return this.citizenshipSelectComponent.citizenships.length > 0 && this.confirmationDocumentComponent.confirmationDocumentForm.valid;
        } else {
          return this.citizenshipSelectComponent.citizenships.length > 0;
        }
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
      if (!this.citizenshipSelectComponent) return false;
      let codeOfRussia = this.countries.find(x => x.name === "Россия").id;
      let foreignCitizenshipsExists = (() => {
        let result = this.citizenshipSelectComponent.citizenships.findIndex(x => {
          return x != codeOfRussia;
        });
        return result == -1 ? false : true;;
      })();
      return foreignCitizenshipsExists;
    },
    representChildrenInterestsDocument: () => {
      let relationType = this.relationTypes.find(x => x.id === this.parentForm.value.relationType);
      return relationType ? relationType.confirmationDocument : false;
    },
    relationType: false,
    childApplicantInfo: false
  }
  formErrors = this.parentStepService.getFormErrors();
  validationMessages = this.parentStepService.getValidationMessages();

  constructor(private fb: FormBuilder,
    private formService: FormService,
    private storageService: WizardStorageService,
    private citizenshipService: CitizenshipService,
    private relationTypeService: RelationTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private parentStepService: ParentStepService) { }

  ngOnInit() {
    this.isAvailable.relationType = this.storageService.request.applicantType !== ApplicantType["Ребенок-заявитель"];
    this.isAvailable.childApplicantInfo = this.storageService.request.applicantType === ApplicantType["Ребенок-заявитель"];

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
      .subscribe(() => this.formService.onValueChange(this.parentForm, this.formErrors, this.validationMessages));

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
          case ApplicantType["Законный представитель ребенка"]:
            return "childrenStep";
          case ApplicantType["Ребенок-заявитель"]:
            return "contactsStep";
          case ApplicantType["Доверенное лицо законного представителя ребенка"]:
            return "applicantStep";
          default:
            break;
        }
      })();
      this.router.navigate(["../" + segment], { relativeTo: this.activatedRoute });
    }
  }
}
