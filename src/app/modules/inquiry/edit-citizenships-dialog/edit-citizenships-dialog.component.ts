import { Component, Inject, OnDestroy, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { Applicant, Child, InquiryService, Parent, ConfigsOfRoutingButtons, PersonWithAddress, ConfirmationDocument, ApplicantType } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
import { EditCitizenshipsComponent } from '../shared/components/edit-citizenships/edit-citizenships.component';
import { Guid } from '../../../shared/models/guid';
import { PersonType } from '../../../shared/person-type.enum';

@Component({
  selector: 'app-edit-citizenships-dialog',
  templateUrl: './edit-citizenships-dialog.component.html',
  styleUrls: ['./edit-citizenships-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCitizenshipsDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent
  private ngUnsubscribe: Subject<any> = new Subject();
  config: ConfigsOfRoutingButtons;

  constructor(public dialogRef: MatDialogRef<EditCitizenshipsDialogComponent>, private cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { $person: BehaviorSubject<Parent | Applicant | Child>, personType: PersonType, applicantType: ApplicantType }) { }

  ngOnInit() {
    this.config = {
      primaryTitle: "Сохранить",
      inverseTitle: "Закрыть",
      primaryAction: () => {
        const patchAddress = (patch: PersonWithAddress) => {
          Object.assign(data, patch);
        }

        let data = this.data.$person.getValue();
        data.citizenships = this.editCitizenshipsComponent.citizenshipSelectComponent.citizenships;
        if (this.editCitizenshipsComponent.isAvailable.hasRfCitizenship()) {
          switch (this.data.personType) {
            case PersonType.Applicant:
              data["countryStateApplicantDocument"] = undefined;
              break;
            case PersonType.Parent:
              data["countryStateDocument"] = undefined;
              break;
            case PersonType.Child:

              break;

            default:
              break;
          }
          patchAddress(this.editCitizenshipsComponent.rfCitizensAddressesComponent.getResult());
        } else if (this.editCitizenshipsComponent.isAvailable.hasForeignCitizenship()) {
          let patch = this.editCitizenshipsComponent.foreignCitizensAddressesComponent.getResult();
          patchAddress(patch);
          (() => {
            const controls = this.editCitizenshipsComponent.editConfirmationDocumentComponent.confirmationDocumentForm.controls;
            const document = new ConfirmationDocument(controls.name.value, controls.series.value, controls.number.value,
              controls.dateIssue.value, controls.dateExpired.value, Guid.newGuid())
            data[this.data.personType === PersonType.Parent ? "countryStateDocument" : "countryStateApplicantDocument"] = document;
          })();
        }
        this.data.$person.next(data);
        this.dialogRef.close();
      },
      inverseAction: () => {
        this.dialogRef.close();
      },
    };
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  isValid() {
    return this.editCitizenshipsComponent && this.editCitizenshipsComponent.isValid();
  }
}
