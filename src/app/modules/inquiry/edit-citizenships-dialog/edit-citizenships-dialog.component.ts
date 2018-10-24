import { Component, Inject, OnDestroy, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { BehaviorSubject, Subject } from 'rxjs';
import { Applicant, Child, InquiryService, Parent, ConfigsOfRoutingButtons, PersonWithAddress } from '../../../shared';
import { WizardStorageService } from '../../wizard/shared';
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
  config: ConfigsOfRoutingButtons = {
    primaryTitle: "Сохранить",
    inverseTitle: "Закрыть",
    primaryAction: () => {
      const patchAddress = (patch:PersonWithAddress)=>{
        Object.assign(data, patch);
      }

      let data = this.data.$person.getValue();
      data.citizenships = this.editCitizenshipsComponent.citizenshipSelectComponent.citizenships;
      if(this.editCitizenshipsComponent.isAvailable.hasRfCitizenship()){
        patchAddress(this.editCitizenshipsComponent.rfCitizensAddressesComponent.getResult());
      } else if(this.editCitizenshipsComponent.isAvailable.hasForeignCitizenship()){
        patchAddress(this.editCitizenshipsComponent.foreignCitizensAddressesComponent.getResult())
      }
      this.data.$person.next(data);
      this.dialogRef.close();
    },
    inverseAction: () => {
      this.dialogRef.close();
    },
  };

  constructor(public dialogRef: MatDialogRef<EditCitizenshipsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { $person: BehaviorSubject<Parent | Applicant | Child> },
    private storageService: WizardStorageService, private inquiryService: InquiryService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
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
