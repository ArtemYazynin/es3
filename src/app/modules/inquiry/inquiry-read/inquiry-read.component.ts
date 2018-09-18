import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CitizenshipService, ConfirmationDocument, Country, DrawService, Entity, Group, GroupService, Inquiry, InquiryService, InstitutionService, PrivilegeOrder, PrivilegeOrderService, Specificity, SpecificityService, Status, StatusService } from '../../../shared/index';


@Component({
  selector: 'app-inquiry-read',
  templateUrl: './inquiry-read.component.html',
  styleUrls: ['./inquiry-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryReadComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country>
  privilegeOrders: Array<PrivilegeOrder>;
  statuses: Array<Status>;
  inquiry: Inquiry;
  specificity: Observable<Specificity>;
  $group: Observable<Group>;
  $institutionType: Observable<Entity<number>>;
  visibility: boolean = false;

  inquiryTypeFriendlyName: string;
  drawManager = this.drawService;
  statusForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private inquiryService: InquiryService,
    private privilegeOrderService: PrivilegeOrderService, private statusService: StatusService, private drawService: DrawService,
    private citizenshipService: CitizenshipService, private fb: FormBuilder, private specificityService: SpecificityService,
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
    this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(inquiry => {
        this.inquiry = inquiry;
      });
    this.statusService.get()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(statuses => {
        this.statuses = statuses;
        if (this.statuses.length > 0)
          this.statusForm.controls.status.patchValue(this.statuses[0].id);
      });
    this.specificity = this.specificityService.get(this.inquiry.inquiryInfo.distributionParams.specificity).pipe(map(specificities => specificities[0]));
    this.$institutionType = this.institutionService.getTypes(this.inquiry.currentEducationPlace.institutionType)
      .pipe(map(types => types[0]));
    this.$group = this.groupService.getGroup(this.inquiry.currentEducationPlace.institution, this.inquiry.currentEducationPlace.group)
      .pipe(map(groups => groups[0]));
    this.visibility = this.inquiry.privilege && Object.keys(this.inquiry.privilege).length > 0
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

  // editCommon(){
  //   this.router.navigate(["/edit/common"], { relativeTo: this.route });
  // }
}
