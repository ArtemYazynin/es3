import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { PetitionType } from '../../../shared/petition-type.enum';
import { WizardStorageService } from '../../wizard/shared';
import { FamilyInfoService } from '../../../shared/family-info.service';
import { takeUntil } from 'rxjs/operators';
import { Petition } from '../../../shared/models/petition.model';
import { FamilyInfo } from '../../../shared/models/family-info.model';
import { InquiryService, FormService } from '../../../shared';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FullNameComponent } from '../../../shared/components/full-name/full-name.component';
import { IdentityCardComponent } from '../../../shared/components/identity-card/identity-card.component';
import { ControlInfo } from '../../../shared/models/controlInfo.model';

@Component({
  selector: 'app-edit-petition-dialog',
  templateUrl: './edit-petition-dialog.component.html',
  styleUrls: ['./edit-petition-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPetitionDialogComponent implements OnInit {
  @ViewChild(FullNameComponent) fullNameComponent: FullNameComponent;
  @ViewChild(IdentityCardComponent) identityCardComponent: IdentityCardComponent;

  form: FormGroup;
  formErrors = { organizationName: "", familyInfo: "" };
  validationMessages = {
    organizationName: { "required": "Обязательное поле." },
    familyInfo: { "required": "Обязательное поле." },
  }
  types: Array<PetitionType> = [PetitionType.Individual, PetitionType.Organization];
  petitionTypes = PetitionType;
  petition: Petition;
  bunchOfFamilyInfo: Array<FamilyInfo> = [];
  private ngUnsubscribe: Subject<any> = new Subject();

  constructor(public dialogRef: MatDialogRef<EditPetitionDialogComponent>, private fb: FormBuilder, private formService: FormService,
    @Inject(MAT_DIALOG_DATA) public data: { $petition: BehaviorSubject<Petition> },
    private storageService: WizardStorageService, private inquiryService: InquiryService, private familyInfoService: FamilyInfoService) { }

  ngOnInit() {
    this.petition = this.data.$petition.getValue();
    this.buildForm();
    this.familyInfoService.gets()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        (() => {
          this.bunchOfFamilyInfo = data;
          //this.bunchOfFamilyInfo.unshift({ id: "", name: "Не выбрано" })
        })();
        if (this.petition) {
          this.form.patchValue({
            petitionType: this.petition.organizationName ? PetitionType.Organization : PetitionType.Individual,
            familyInfo: this.petition.familyInfo,
            comment: this.petition.comment,
            organizationName: this.petition.organizationName
          });
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
  save() {

    //this.data.$petition.next();
  }
}
