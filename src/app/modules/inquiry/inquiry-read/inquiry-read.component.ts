import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, skip, takeUntil } from 'rxjs/operators';
import { Applicant, ApplicantType, BehaviorMode, Child, CitizenshipService, CommonService, ConfirmationDocument, Country, Entity, Inquiry, InquiryService, inquiryType, InstitutionService, Parent, PrivilegeOrder, PrivilegeOrderService, Specificity, SpecificityService, Status, StatusService } from '../../../shared/index';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCurrentEducationPlaceDialogComponent } from '../edit-current-education-place-dialog/edit-current-education-place-dialog.component';
import { EditFileAttachmentsDialogComponent } from '../edit-file-attachments-dialog/edit-file-attachments-dialog.component';
import { EditInquiryInfoDialogComponent } from '../edit-inquiry-info-dialog/edit-inquiry-info-dialog.component';
import { EditPersonDialogComponent } from '../edit-person-dialog/edit-person-dialog.component';
import { EditPreschoolInstitutionDialogComponent } from '../edit-preschool-institution-dialog/edit-preschool-institution-dialog.component';
import { EditPrivilegeDialogComponent } from '../edit-privilege-dialog/edit-privilege-dialog.component';
import { EditSchoolInquiryInfoDialogComponent } from '../edit-school-inquiry-info-dialog/edit-school-inquiry-info-dialog.component';

@Component({
  selector: 'app-inquiry-read',
  templateUrl: './inquiry-read.component.html',
  styleUrls: ['./inquiry-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryReadComponent implements OnInit, OnDestroy {
  $inquiry: BehaviorSubject<Inquiry>;
  private ngUnsubscribe: Subject<any> = new Subject();
  inquiryTypes = inquiryType;
  personTypes = PersonType;
  countries: Array<Country>
  privilegeOrders: Array<PrivilegeOrder>;
  statuses: Array<Status>;
  specificity: Observable<Specificity>;
  $institutionType: Observable<Entity<number>>;

  inquiryTypeFriendlyName: string;
  applicantTypes = ApplicantType;
  statusForm: FormGroup;
  modes = BehaviorMode;
  $applicantRepresentParentDocument: BehaviorSubject<ConfirmationDocument>;
  $applicant: BehaviorSubject<Applicant>;
  $parent: BehaviorSubject<Parent>;
  children: Array<BehaviorSubject<Child>> = [];

  constructor(private route: ActivatedRoute, private inquiryService: InquiryService,
    private privilegeOrderService: PrivilegeOrderService, private statusService: StatusService,
    private citizenshipService: CitizenshipService, private fb: FormBuilder, private specificityService: SpecificityService, public dialog: MatDialog,
    private institutionService: InstitutionService, private cdr: ChangeDetectorRef, private commonService: CommonService) { }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(countries => {
        this.countries = countries;
      });
    this.privilegeOrderService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(orders => {
        this.privilegeOrders = orders;
      });

    this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(inquiry => {
        this.$inquiry = new BehaviorSubject<Inquiry>(inquiry);
        this.$applicant = new BehaviorSubject<Applicant>(inquiry.applicant);
        this.$parent = new BehaviorSubject<Parent>(inquiry.parent);
        this.children = inquiry.children.map(x => new BehaviorSubject<Child>(x));
        if (inquiry.applicant && inquiry.applicant.applicantRepresentParentDocument) {
          this.$applicantRepresentParentDocument = new BehaviorSubject<ConfirmationDocument>(inquiry.applicant.applicantRepresentParentDocument);
          this.$applicantRepresentParentDocument
            .pipe(skip(1), takeUntil(this.ngUnsubscribe))
            .subscribe(doc => {
              let inquiry = this.$inquiry.getValue();
              inquiry.applicant.applicantRepresentParentDocument = doc;
              this.inquiryService.updateInquiryPropery(inquiry.id, inquiry.applicant.applicantRepresentParentDocument);
              this.$inquiry.next(inquiry);
              this.cdr.markForCheck();
            });
        }
        if (inquiry.type == inquiryType.preschool)
          this.specificity = this.specificityService.get(inquiry.inquiryInfo.distributionParams.specificity).pipe(map(specificities => specificities[0]));
        this.$institutionType = this.institutionService.getTypes(inquiry.currentEducationPlace.institutionType).pipe(map(types => types[0]));
        this.cdr.markForCheck();
      });
    this.statusService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(statuses => {
        this.statuses = statuses;
        if (this.statuses.length > 0)
          this.statusForm.controls.status.patchValue(this.statuses[0].id);
      });

    this.buildForm();
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getDocumentView(document) {
    return ConfirmationDocument.toString(document);
  }
  changeStatus(status: string) {

  }

  buildForm() {
    this.statusForm = this.fb.group({
      status: ["", []]
    });
  }

  edit = (() => {
    let getConfig = (addConfig?: object) => {
      let config = { $inquiry: this.$inquiry };
      if (addConfig) Object.assign(config, addConfig);

      return this.commonService.getDialogConfig(config);
    }
    const person = (modelType: ApplicantType) => {
      this.dialog.open(EditPersonDialogComponent, getConfig({ modelType: modelType, inquiryType: this.$inquiry.getValue().type }));
      this.dialog.afterAllClosed.subscribe(x => {

      });
    }
    const privilege = () => {
      this.dialog.open(EditPrivilegeDialogComponent, getConfig());
      // const dialogRef = this.dialog.open(EditPrivilegeDialogComponent, config);
      // dialogRef.afterClosed().subscribe((result:Inquiry) => {
      //   console.log('The dialog was closed');
      // });
    }
    const inquiryInfo = () => {
      this.dialog.open(EditInquiryInfoDialogComponent, getConfig());
    }
    const institutions = () => {
      this.dialog.open(EditPreschoolInstitutionDialogComponent, getConfig());
    }



    const currentEducationPlace = () => {
      this.dialog.open(EditCurrentEducationPlaceDialogComponent, getConfig());
    }

    const fileAttachments = () => {
      this.dialog.open(EditFileAttachmentsDialogComponent, getConfig());
    }
    const schoolInquiryInfo = () => {
      this.dialog.open(EditSchoolInquiryInfoDialogComponent, getConfig());
    }
    return {
      privilege: privilege,
      person: person,
      inquiryInfo: inquiryInfo,
      schoolInquiryInfo: schoolInquiryInfo,
      institutions: institutions,
      currentEducationPlace: currentEducationPlace,
      fileAttachments: fileAttachments
    }
  })();
}
