import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CitizenshipService, ConfirmationDocument, Country, DrawService, Entity, Group, GroupService, Inquiry, InquiryService, InstitutionService, PrivilegeOrder, PrivilegeOrderService, Specificity, SpecificityService, Status, StatusService, ApplicantType } from '../../../shared/index';
import { EditPersonDialogComponent } from '../edit-person-dialog/edit-person-dialog.component';
import { EditPrivilegeDialogComponent } from '../edit-privilege-dialog/edit-privilege-dialog.component';
import { EditInquiryInfoDialogComponent } from '../edit-inquiry-info-dialog/edit-inquiry-info-dialog.component';


@Component({
  selector: 'app-inquiry-read',
  templateUrl: './inquiry-read.component.html',
  styleUrls: ['./inquiry-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryReadComponent implements OnInit, OnDestroy {
  $inquiry: BehaviorSubject<Inquiry>;
  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country>
  privilegeOrders: Array<PrivilegeOrder>;
  statuses: Array<Status>;
  specificity: Observable<Specificity>;
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>;

  inquiryTypeFriendlyName: string;
  applicantTypes = ApplicantType;
  drawManager = this.drawService;
  statusForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private inquiryService: InquiryService,
    private privilegeOrderService: PrivilegeOrderService, private statusService: StatusService, private drawService: DrawService,
    private citizenshipService: CitizenshipService, private fb: FormBuilder, private specificityService: SpecificityService, public dialog: MatDialog,
    private institutionService: InstitutionService, private groupService: GroupService) { }

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

    this.$inquiry = this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId);
    this.statusService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(statuses => {
        this.statuses = statuses;
        if (this.statuses.length > 0)
          this.statusForm.controls.status.patchValue(this.statuses[0].id);
      });
    (() => {
      let inquiry = this.$inquiry.getValue();
      this.specificity = this.specificityService.get(inquiry.inquiryInfo.distributionParams.specificity).pipe(map(specificities => specificities[0]));
      this.$institutionType = this.institutionService.getTypes(inquiry.currentEducationPlace.institutionType)
        .pipe(map(types => types[0]));
      this.$group = this.groupService.getGroup(inquiry.currentEducationPlace.institution, inquiry.currentEducationPlace.group)
        .pipe(map(groups => groups.length > 1 ? null : groups[0]));
    })();

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
    const getDefaultConfig = (modelType?: ApplicantType) => {
      let config = new MatDialogConfig();
      config.disableClose = true;
      config.autoFocus = true;
      config.data = {
        $inquiry: this.$inquiry,
        modelType: modelType
      };
      config.width = "1000px";
      return config;
    }
    const common = () => {

    }
    const person = (modelType: ApplicantType) => {
      this.dialog.open(EditPersonDialogComponent, getDefaultConfig(modelType));
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

    }

    const contactInfo = () => {
      return true;
    }
    return {
      common: common,
      privilege: privilege,
      person: person,
      inquiryInfo: inquiryInfo,
      institutions: institutions,
      contactInfo: contactInfo
    }
  })();
}
