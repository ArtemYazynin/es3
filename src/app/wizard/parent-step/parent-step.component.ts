import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, ValidatorFn } from "@angular/forms";
import { Subscription } from 'rxjs/_esm5';
import { forkJoin } from 'rxjs';
import { isNullOrUndefined } from 'util';
import {
  IdentityCardType,
  IdentityCard,
  Person,
  Parent,
  FormService,
  CitizenshipService,
  RelationTypeService,
  ApplicantType,
  ConfirmationDocument
} from "../../shared/index";
import { IdentityCardComponent } from '../../identity-card/identity-card.component';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { WizardStorageService } from '../../shared/wizard-storage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Http } from '@angular/http';
import { Country } from '../../shared/citizenships/country';
import { RelationType } from '../../shared/relationTypes/relation-type';

@Component({
  moduleId: module.id,
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css']
})
export class ParentStepComponent implements OnInit {
  private inquiryType: string;
  private noMiddlenameSubscription: Subscription;
  private fioRegExp: string = "^[А-яЁё]+([ -]{1}[А-яЁё]+)*[ ]*$";

  parentForm: FormGroup;
  relationTypes: Array<RelationType> = [];
  countries: Array<Country> = [];

  isValid(appForm: FormGroup, identityCardForm: FormGroup, countryStateDocument): boolean {
    var isValidCountryStateDocument = (() => {
      if (isNullOrUndefined(appForm.value.citizenship) || appForm.value.citizenship === "") return false;
      if (parseInt(appForm.value.citizenship) === this.countries.find(x => x.name === "Россия").id) return true;
      if (!countryStateDocument) return false;
      return countryStateDocument.valid;
    })();
    var isValidIdentityCardForm = identityCardForm ? identityCardForm.valid : false;
    return appForm.valid && isValidIdentityCardForm && isValidCountryStateDocument;
  }
  isAvailable = {
    countryStateDocument: () => {
      return this.parentForm.value.citizenship && parseInt(this.parentForm.value.citizenship) !== this.countries.find(x => x.name === "Россия").id;
    },
    representChildrenInterestsDocument: () => {
      let relationType = this.relationTypes.find(x => x.id === this.parentForm.value.relationType);
      return relationType ? relationType.confirmationDocument : false;
    },
  }
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());

  @ViewChild(IdentityCardComponent)
  identityCardComponent: IdentityCardComponent;

  @ViewChild(ConfirmationDocumentComponent)
  confirmationDocumentComponent: ConfirmationDocumentComponent

  private subscribeToMiddlename(): void {
    let toggleMiddlenameValidators = noMiddlename => {
      const middlename = this.parentForm.get('middlename');
      /** Массив валидаторов */
      const middlenameValidators: ValidatorFn[] = [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(this.fioRegExp)
      ];

      /** если есть отчество, добавляет валидаторы, если нет, очищает */
      middlename.clearValidators();
      if (!noMiddlename) {
        middlename.setValidators(middlenameValidators);
      }
      /** Обновляем состояние контрола */
      middlename.updateValueAndValidity();
    }
    this.noMiddlenameSubscription = this.parentForm.get('noMiddlename')
      .valueChanges
      .subscribe(value => toggleMiddlenameValidators(value));
  }
  ngOnDestroy() {
    this.noMiddlenameSubscription.unsubscribe();
  }
  constructor(private fb: FormBuilder,
    private http: Http,
    private formService: FormService,
    private storageService: WizardStorageService,
    private citizenshipService: CitizenshipService,
    private relationTypeService: RelationTypeService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    forkJoin([this.citizenshipService.getCountries(), this.relationTypeService.get()])
      .subscribe(results => {
        this.countries = results[0];
        this.relationTypes = results[1];

        this.buildForm();
        this.subscribeToMiddlename();
      });

    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });
  }

  private buildForm() {
    this.parentForm = this.fb.group({
      "lastname": [
        "ластнейм",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "firstname": [
        "фёстнейм",
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "middlename": [
        "миддлнейм", [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(this.fioRegExp)
        ]
      ],
      "noMiddlename": [
        false,
        []
      ],
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
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }

  private onValueChange(data?: any) {
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
      this.router.navigate(["../${segment}"], { relativeTo: this.activatedRoute });
    }
  }
}
