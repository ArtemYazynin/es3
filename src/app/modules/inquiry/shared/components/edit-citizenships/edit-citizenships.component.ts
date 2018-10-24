import { Component, OnInit, Input, ChangeDetectionStrategy, ViewChild, OnDestroy } from '@angular/core';
import { AttachmentType, Parent, Applicant, Child, CitizenshipService, ApplicantType, Country } from '../../../../../shared';
import { CitizenshipSelectComponent } from '../../../../../shared/components/citizenship-select/citizenship-select.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { RfCitizensAddressesComponent } from '../../../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { ForeignCitizensAddressesComponent } from '../../../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { EditConfirmationDocumentComponent } from '../../../../../shared/components/edit-confirmation-document/edit-confirmation-document.component';

@Component({
  selector: 'app-edit-citizenships',
  templateUrl: './edit-citizenships.component.html',
  styleUrls: ['./edit-citizenships.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCitizenshipsComponent implements OnInit, OnDestroy {
  @Input() model: Parent | Applicant | Child;

  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(RfCitizensAddressesComponent) rfCitizensAddressesComponent:RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignCitizensAddressesComponent:ForeignCitizensAddressesComponent;
  @ViewChild(EditConfirmationDocumentComponent) editConfirmationDocumentComponent:EditConfirmationDocumentComponent;
  
  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country>
  documentConfig: any;
  constructor(private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(countries => {
        this.countries = countries;
      });
    const isParent = !!this.model["countryStateDocument"];
    this.documentConfig = {
      title: isParent
        ? "Документ, подтверждающий право пребывания законного представителя на территории РФ"
        : "Документ, подтверждающий полномочие доверенного лица представлять интересы законного представителя ребенка",
      type: isParent ? AttachmentType.CountryStateDocument : AttachmentType.CountryStateApplicantDocument,
      model: isParent ? this.model["countryStateDocument"] : this.model["countryStateApplicantDocument"]
    }
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  isAvailable = {
    hasForeignCitizenship: () => {
      return this.citizenshipSelectComponent && this.citizenshipService.hasForeignCitizenship(this.citizenshipSelectComponent.citizenships, this.countries);
    },
    hasRfCitizenship: () => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.indexOf(643) >= 0;
    },
    addresses: () => {
      return this.citizenshipSelectComponent.citizenships.length > 0;

    }
  }

  isValid(): boolean {
    return true;
  }
}
