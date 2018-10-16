import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ConfirmationDocumentService } from '../../../shared/confirmation-document.service';
import { ApplicantType, CitizenshipService, ConfirmationDocument, Country, DrawService, Entity, GroupService, Inquiry, InquiryService, inquiryType, InstitutionService, PrivilegeOrder, PrivilegeOrderService, Specificity, SpecificityService, Status, StatusService, ConfirmationDocumentMode } from '../../../shared/index';
import { EditContactInfoDialogComponent } from '../edit-contact-info-dialog/edit-contact-info-dialog.component';
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
  countries: Array<Country>
  privilegeOrders: Array<PrivilegeOrder>;
  statuses: Array<Status>;
  specificity: Observable<Specificity>;
  $institutionType: Observable<Entity<number>>;

  inquiryTypeFriendlyName: string;
  applicantTypes = ApplicantType;
  drawManager = this.drawService;
  statusForm: FormGroup;
  mode = ConfirmationDocumentMode;

  constructor(private router: Router, private route: ActivatedRoute, private inquiryService: InquiryService,
    private privilegeOrderService: PrivilegeOrderService, private statusService: StatusService, private drawService: DrawService,
    private citizenshipService: CitizenshipService, private fb: FormBuilder, private specificityService: SpecificityService, public dialog: MatDialog,
    private institutionService: InstitutionService, private groupService: GroupService, private cdr: ChangeDetectorRef) { }

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
      .subscribe(data => {
        this.$inquiry = new BehaviorSubject<Inquiry>(data);
        if (data.type == inquiryType.preschool)
          this.specificity = this.specificityService.get(data.inquiryInfo.distributionParams.specificity).pipe(map(specificities => specificities[0]));
        this.$institutionType = this.institutionService.getTypes(data.currentEducationPlace.institutionType).pipe(map(types => types[0]));
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
    // const getDefaultConfig = (modelType?: ApplicantType) => {
    //   let config = new MatDialogConfig();
    //   config.disableClose = true;
    //   config.autoFocus = true;
    //   config.data = {
    //     $inquiry: this.$inquiry,
    //     modelType: modelType
    //   };
    //   config.width = "1000px";
    //   return config;
    // }
    const getDefaultConfig = (obj?: object) => {
      let config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = true;
      config.data = { $inquiry: this.$inquiry };
      if (obj) {
        Object.assign(obj, config.data);
      }
      config.width = "1000px";
      return config;
    }
    const common = () => {

    }
    const person = (modelType: ApplicantType) => {
      this.dialog.open(EditPersonDialogComponent, getDefaultConfig({ modelType: modelType }));
    }
    const privilege = () => {
      this.dialog.open(EditPrivilegeDialogComponent, getDefaultConfig());
      // const dialogRef = this.dialog.open(EditPrivilegeDialogComponent, config);
      // dialogRef.afterClosed().subscribe((result:Inquiry) => {
      //   console.log('The dialog was closed');
      // });
    }
    const inquiryInfo = () => {
      this.dialog.open(EditInquiryInfoDialogComponent, getDefaultConfig());
    }
    const institutions = () => {
      this.dialog.open(EditPreschoolInstitutionDialogComponent, getDefaultConfig());
    }

    const contactInfo = () => {
      this.dialog.open(EditContactInfoDialogComponent, getDefaultConfig());
    }

    const currentEducationPlace = () => {
      this.dialog.open(EditCurrentEducationPlaceDialogComponent, getDefaultConfig());
    }

    const fileAttachments = () => {
      this.dialog.open(EditFileAttachmentsDialogComponent, getDefaultConfig());
    }
    const schoolInquiryInfo = () => {
      this.dialog.open(EditSchoolInquiryInfoDialogComponent, getDefaultConfig());
    }
    const confirmationDocument = () => {
      //this.dialog.open(EditConfirmationDocumentDialogComponent, getDefaultConfig(config));
    }
    return {
      common: common,
      privilege: privilege,
      person: person,
      inquiryInfo: inquiryInfo,
      schoolInquiryInfo: schoolInquiryInfo,
      institutions: institutions,
      contactInfo: contactInfo,
      currentEducationPlace: currentEducationPlace,
      fileAttachments: fileAttachments,
      confirmationDocument: confirmationDocument
    }
  })();
}
