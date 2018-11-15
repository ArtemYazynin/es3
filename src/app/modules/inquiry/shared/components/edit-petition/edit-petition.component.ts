import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FamilyInfo, FormService, Inquiry } from '../../../../../shared';
import { FullNameComponent } from '../../../../../shared/components/full-name/full-name.component';
import { IdentityCardComponent } from '../../../../../shared/components/identity-card/identity-card.component';
import { FamilyInfoService } from '../../../../../shared/family-info.service';
import { ControlInfo } from '../../../../../shared/models/controlInfo.model';
import { PetitionType } from '../../../../../shared/petition-type.enum';

@Component({
  selector: 'app-edit-petition',
  templateUrl: './edit-petition.component.html',
  styleUrls: ['./edit-petition.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetitionComponent implements OnInit {
  @ViewChild(FullNameComponent) fullNameComponent: FullNameComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;

  @Input() inquiry: Inquiry;

  form: FormGroup;
  formErrors = { organizationName: "", familyInfo: "" };
  validationMessages = {
    organizationName: { "required": "Обязательное поле." },
    familyInfo: { "required": "Обязательное поле." },
  }
  types: Array<PetitionType> = [PetitionType.Individual, PetitionType.Organization];
  petitionTypes = PetitionType;
  bunchOfFamilyInfo: Array<FamilyInfo> = [];
  private ngUnsubscribe: Subject<any> = new Subject();
  constructor(private fb: FormBuilder, private formService: FormService, private familyInfoService: FamilyInfoService) { }

  ngOnInit() {
    this.buildForm();
    this.familyInfoService.gets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        (() => {
          this.bunchOfFamilyInfo = data;
          //this.bunchOfFamilyInfo.unshift({ id: "", name: "Не выбрано" })
        })();
        if (this.inquiry.petition) {
          this.updateForm();
        }
        if (this.form.controls.petitionType.value == PetitionType.Organization) {
          this.formService.updateValidators(this.form, [new ControlInfo("organizationName", [Validators.required])])
        } else {

        }
        // this.formService.updateValidators(this.contactsForm,
        //   [new ControlInfo("smsPhone", []), new ControlInfo("byEmail", [Validators.requiredTrue])]);
        //this.familyInfo = this.petition ? this.petition.familyInfo : this.bunchOfFamilyInfo[0];
      });
  }

  private buildForm() {
    this.form = this.fb.group(
      {
        "organizationName": ["", []],
        "familyInfo": ["", [Validators.required]],
        "comment": ["", []],
        "petitionType": [PetitionType.Individual, [Validators.required]]
      }
    );
    this.form.valueChanges.subscribe(data => this.onValueChange(data));
    this.onValueChange();
  }

  updateForm() {
    this.form.patchValue({
      petitionType: this.inquiry.petition.organizationName ? PetitionType.Organization : PetitionType.Individual,
      familyInfo: this.bunchOfFamilyInfo.find(info => info.id == this.inquiry.petition.familyInfo.id),
      comment: this.inquiry.petition.comment ? this.inquiry.petition.comment : undefined,
      organizationName: this.inquiry.petition.organizationName ? this.inquiry.petition.organizationName : undefined
    });
  }

  private onValueChange(data?: any) {
    this.formService.onValueChange(this.form, this.formErrors, this.validationMessages);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  changePetitionType(change: MatRadioChange) {
    switch (change.value) {
      case PetitionType.Individual:
        this.form.controls.organizationName.patchValue("");
        this.form.controls.organizationName.clearValidators();
        this.form.controls.organizationName.updateValueAndValidity();
        break;
      case PetitionType.Organization:
        this.formService.updateValidators(this.form, [new ControlInfo("organizationName", [Validators.required])])
        break;

      default:
        break;
    }
  }

  isValid() {
    let petitionFormIsValid = this.form && this.form.valid
    if (this.form.controls.petitionType.value == PetitionType.Individual) {
      let fullNameIsValid = this.fullNameComponent ? this.fullNameComponent.isValid() : false;
      let identityCardIsValid = this.identityCardComponent ? this.identityCardComponent.isValid() : false;
      return fullNameIsValid && identityCardIsValid && petitionFormIsValid;
    }
    return petitionFormIsValid;
  }
}