import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { EditCitizenshipsDialogComponent } from '../../../modules/inquiry/edit-citizenships-dialog/edit-citizenships-dialog.component';
import { ApplicantType } from '../../applicant-type.enum';
import { CommonService } from '../../common.service';
import { DrawService } from '../../draw.service';
import { Applicant, CitizenshipService, BehaviorMode, Country, InquiryService, Parent, Theme } from '../../index';
import { Child } from '../../models/child.model';
import { ConfirmationDocument } from '../../models/confirmation-document.model';
import { PersonType } from '../../person-type.enum';

@Component({
  selector: 'app-citizenships-card',
  templateUrl: './citizenships-card.component.html',
  styleUrls: ['./citizenships-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitizenshipsCardComponent implements OnInit, OnDestroy {
  @Input() model: Parent | Applicant | Child;
  @Input() mode: BehaviorMode;
  @Input() personType: PersonType;
  @Input() applicantType: ApplicantType;

  private ngUnsubscribe: Subject<any> = new Subject();

  $document: BehaviorSubject<ConfirmationDocument>;
  countries: Array<Country> = [];
  modes = BehaviorMode;
  personTypes = PersonType;
  documentTitle: string;
  themes = Theme;
  theme: Theme;

  constructor(public drawService: DrawService, private citizenshipService: CitizenshipService, private dialog: MatDialog,
    private commonService: CommonService, private inquiryService: InquiryService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.theme = this.mode == this.modes.Edit ? this.themes.Read : this.themes.Preview;
    switch (this.personType) {
      case PersonType.Parent:
        this.$document = new BehaviorSubject<ConfirmationDocument>((this.model as Parent).countryStateDocument);
        this.documentTitle = "Документ, подтверждающий право пребывания законного представителя на территории РФ";
        break;
      case PersonType.Applicant:
        this.$document = new BehaviorSubject<ConfirmationDocument>((this.model as Applicant).countryStateApplicantDocument);
        this.documentTitle = "Документ, подтверждающий право пребывания доверенного лица законного представителя на территории РФ";
        break;
      default:
        break;
    }
    if (this.$document) {
      this.$document
        .pipe(skip(1), takeUntil(this.ngUnsubscribe))
        .subscribe(doc => {
          switch (this.personType) {
            case PersonType.Parent:
              (this.model as Parent).countryStateDocument = doc;
              break;
            case PersonType.Applicant:
              (this.model as Applicant).countryStateApplicantDocument = doc;
              break;
            default:
              break;
          }
          this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.model);
          this.cdr.markForCheck();
        });
    }

    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  edit() {
    let config = {
      $person: new BehaviorSubject<Parent | Applicant | Child>(this.model),
      personType: this.personType,
      applicantType: this.applicantType
    };
    config.$person
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((person: Parent | Applicant | Child) => {
        switch (this.personType) {
          case PersonType.Parent:
            const countryStateDocument = (person as Parent).countryStateDocument;
            this.$document.next(countryStateDocument);
            break;
          case PersonType.Applicant:
            const countryStateApplicantDocument = (person as Applicant).countryStateApplicantDocument;
            this.$document.next(countryStateApplicantDocument);
          default:
            break;
        }
        this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, person);
        this.cdr.markForCheck();
      });
    this.dialog.open(EditCitizenshipsDialogComponent, this.commonService.getDialogConfig(config));
  }
}
