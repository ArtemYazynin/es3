import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CitizenshipService, ConfirmationDocument, Country, DrawService, Entity, Group, GroupService, Inquiry, InquiryService, InstitutionService, PrivilegeOrder, PrivilegeOrderService, Specificity, SpecificityService, Status, StatusService } from '../../../shared/index';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogEditComponent } from '../shared/components/dialog-edit/dialog-edit.component';


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
  visibility: boolean = false;

  inquiryTypeFriendlyName: string;
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
        .pipe(map(groups => groups[0]));
      this.visibility = inquiry.privilege && Object.keys(inquiry.privilege).length > 0
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
    const common = () => {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.$inquiry;
      dialogConfig.width = "1000px";
      this.dialog.open(DialogEditComponent, dialogConfig);
      //const dialogRef = this.dialog.open(DialogEditComponent, dialogConfig);
      // dialogRef.afterClosed().subscribe((result:Inquiry) => {
      //   console.log('The dialog was closed');
      // });
    }
    return {
      common: common
    }
  })();
}
