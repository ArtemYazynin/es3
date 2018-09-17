import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CitizenshipService, ConfirmationDocument, Country, DrawService, Inquiry, InquiryService, PrivilegeOrder, PrivilegeOrderService, Status, StatusService } from '../../../shared/index';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogEditComponent } from '../shared/components/dialog-edit/dialog-edit.component';


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
  inquiryTypeFriendlyName: string;
  drawManager = this.drawService;

  constructor(private router: Router, private route: ActivatedRoute, private inquiryService: InquiryService,
    private privilegeOrderService: PrivilegeOrderService, private statusService: StatusService, private drawService: DrawService,
    private citizenshipService: CitizenshipService, public dialog: MatDialog) { }

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

  }

  edit = (() => {
    const common = () => {
      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.data = this.inquiry;
      const dialogRef = this.dialog.open(DialogEditComponent, dialogConfig);

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
    }
    return {
      common: common
    }
  })();
}
