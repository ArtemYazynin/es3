import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { ApplicantType, InquiryService, Person, IdentityCard } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditPersonComponent } from '../shared/components/edit-person/edit-person.component';

@Component({
  selector: 'app-edit-person-dialog',
  templateUrl: './edit-person-dialog.component.html',
  styleUrls: ['./edit-person-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPersonDialogComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  applicantTypes = ApplicantType;
  constructor(public dialogRef: MatDialogRef<EditPersonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $person: BehaviorSubject<Person>},
    private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  person: Person;

  ngOnInit() {
    this.person = this.data.$person.getValue();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  save() {
    let s = this;
    const fullnameForm = this.editPersonComponent.fullnameComponent.fullnameForm;
    let person = new Person(fullnameForm.controls.lastname.value, fullnameForm.controls.firstname.value, fullnameForm.controls.middlename.value, this.editPersonComponent.snilsComponent.snils, fullnameForm.controls.noMiddlename.value);
    person.identityCard = new IdentityCard(this.editPersonComponent.identityCardComponent.identityCardForm);
    person.id = this.person.id;
    this.data.$person.next(person);
    this.dialogRef.close();
    // const update = (patch: object) => {
    //   Object.assign(this.person, patch);
    //   this.data.$person.subscribe(inquiry => {
    //     this.inquiryService.update(inquiry.id, inquiry)
    //       .pipe(takeUntil(this.ngUnsubscribe))
    //       .subscribe(x => this.data.$person.next(this.person));
    //   }).unsubscribe();
    // }

    // this.inquiryService.saveParent(this.person, this.editPersonComponent, update, this.data.modelType == ApplicantType.Parent);
    // if (this.data.modelType == ApplicantType.Applicant) {
    //   this.inquiryService.saveApplicant(this.person, this.editPersonComponent, update);
    // }
    this.dialogRef.close();
  }

  isValid = (): boolean => {
    return this.editPersonComponent && this.editPersonComponent.isValid();
  }
}
