import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription, Subject } from 'rxjs';
import { InquiryService, Inquiry, inquiryType, PrivilegeOrderService, PrivilegeOrder, ConfirmationDocument, StatusService, Status, DrawService, CitizenshipService, Country } from '../../../shared/index';
import { pipe } from '@angular/core/src/render3/pipe';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-inquiry-read',
  templateUrl: './inquiry-read.component.html',
  styleUrls: ['./inquiry-read.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryReadComponent implements OnInit, OnDestroy {
  private ngUnsubscribe: Subject<any> = new Subject();
  countries:Array<Country>
  privilegeOrders: Array<PrivilegeOrder>;
  statuses: Array<Status>;
  inquiry: Inquiry;
  inquiryTypeFriendlyName: string;
  drawManager = this.drawService;

  constructor(private router: Router, private route: ActivatedRoute, private inquiryService: InquiryService,
    private privilegeOrderService: PrivilegeOrderService, private statusService: StatusService, private drawService: DrawService,
    private citizenshipService: CitizenshipService) { }

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
      })
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  getDocumentView(document) {
    return ConfirmationDocument.toString(document);
  }
  changeStatus(status: string) {
    let s = this;
  }
}
