import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, AfterViewInit, ContentChildren, forwardRef } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
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
  WizardStorageService,
  IdentityCardService,
  Entity
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

  @ViewChild(IdentityCardComponent) identityCardComponent;
  @ViewChild(ConfirmationDocumentComponent) confirmationDocumentComponent;
  @ViewChild(FullNameComponent) fullnameComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent;

  private inquiryType: string;
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
  snilsMask = [/\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, "-", /\d/, /\d/, /\d/, " ", /\d/, /\d/];
  private isValidAllCitizenships(addCondition?: (item: string) => {}): boolean {
   //if (this.citizenshipSelectComponent.citizenships.length === 0) return false;
    return false;
    // if (this.citizenshipSelectComponents.length === 0) return false;
    // let citizenships = <Array<CitizenshipSelectComponent>>this.citizenshipSelectComponents["_results"];
    // let result = true;
    // for (let index = 0, len = citizenships.length; index < len; index++) {
    //   let addConditionResult = addCondition ? addCondition(citizenships[index].citizenship) : true;
    //   if (isNullOrUndefined(citizenships[index].citizenship) || citizenships[index].citizenship === "" || addConditionResult) {
    //     result = false;
    //     break;
    //   }
    // }
    // return result;
  }
  isValid(): boolean {
    let isValid = {
      parentForm: this.parentForm && this.parentForm.valid || false,
      identityCardForm: this.identityCardComponent
        && this.identityCardComponent.identityCardForm
        && this.identityCardComponent.identityCardForm.valid
        || false,
      fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
      birthInfoForm: (() => {
        if (this.storageService.request.applicantType !== ApplicantType["Лицо, подающее заявление о приёме самого себя"]) {
          return true;
        }
        return this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false;
      })(),
      countryStateForm: (() => {
        if (!this.parentForm || !this.parentForm.valid) return false;
        let citizenshipsIsValid: boolean = this.isValidAllCitizenships();
        return citizenshipsIsValid && this.confirmationDocumentComponent
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
      let visible = this.isValidAllCitizenships(citizenship => {
        return parseInt(citizenship) === this.countries.find(x => x.name === "Россия").id;
      });
      return visible;
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
    private activatedRoute: ActivatedRoute,
    private identityCardService: IdentityCardService) { }

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
      this.router.navigate(["../" + segment], { relativeTo: this.activatedRoute });
    }
  }
}
