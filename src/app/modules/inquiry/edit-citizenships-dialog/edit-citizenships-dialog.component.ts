import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { Applicant, ApplicantType, Child, ConfigsOfRoutingButtons, ConfirmationDocument, Parent, PersonWithAddress } from '../../../shared';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../shared/components/edit-citizenships/edit-citizenships.component';

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
          const patch = this.editCitizenshipsComponent.rfCitizensAddressesComponent
            ? this.editCitizenshipsComponent.rfCitizensAddressesComponent.getResult()
            : undefined;
          patchAddress(patch);
        } else if (this.editCitizenshipsComponent.isAvailable.hasForeignCitizenship()) {
          let patch = this.editCitizenshipsComponent.foreignCitizensAddressesComponent
            ? this.editCitizenshipsComponent.foreignCitizensAddressesComponent.getResult()
            : undefined;
          patchAddress(patch);
          (() => {
            if (this.editCitizenshipsComponent.editConfirmationDocumentComponent) {
              const document = ConfirmationDocument.construct(this.editCitizenshipsComponent.editConfirmationDocumentComponent.confirmationDocumentForm)
              data[this.data.personType === PersonType.Parent ? "countryStateDocument" : "countryStateApplicantDocument"] = document;
            }
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
