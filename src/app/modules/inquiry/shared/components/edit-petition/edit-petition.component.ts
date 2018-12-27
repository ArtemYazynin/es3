import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FamilyInfo, FormService, Petition, Theme } from '../../../../../shared';
import { EditFullNameComponent } from '../../../../../shared/components/edit-full-name/edit-full-name.component';
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
  @ViewChild(EditFullNameComponent) fullNameComponent: EditFullNameComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;

  @Input() petition: Petition;

  themes = Theme;
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
  private organizationName: "organizationName";
  constructor(private fb: FormBuilder, private formService: FormService, private familyInfoService: FamilyInfoService) { }

  ngOnInit() {
    this.buildForm();
    this.familyInfoService.gets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.bunchOfFamilyInfo = data;
        if (this.petition && this.petition.id) {
          this.updateForm();
        }
        if (this.form.controls.petitionType.value == PetitionType.Organization) {
          this.setRequiredValidator();
        }
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
      petitionType: this.petition.organizationName ? PetitionType.Organization : PetitionType.Individual,
      familyInfo: this.bunchOfFamilyInfo.find(info => info.id == this.petition.familyInfo.id),
      comment: this.petition.comment ? this.petition.comment : undefined,
      organizationName: this.petition.organizationName ? this.petition.organizationName : undefined
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
        this.setRequiredValidator();
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

  getResult() {
    let newData = Petition.buildByForm(this, this.form);
    if (!this.petition.id) {
      Object.assign(this.petition, newData);
    }
    else {
      this.petition.comment = newData.comment;
      this.petition.familyInfo = newData.familyInfo;
      this.petition.person = newData.person;
      this.petition.organizationName = newData.organizationName;
    }
    return this.petition;
  }

  private setRequiredValidator() {
    this.formService.updateValidators(this.form, [new ControlInfo(this.organizationName, [Validators.required])])
  }
}
