import { Component, OnInit, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Child } from '../../models/child.model';
import { Parent, Applicant, Country, CitizenshipService, InquiryService } from '../../index';
import { DrawService } from '../../draw.service';
import { takeUntil, skip } from 'rxjs/operators';
import { Subject, BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { EditCitizenshipsDialogComponent } from '../../../modules/inquiry/edit-citizenships-dialog/edit-citizenships-dialog.component';
import { CommonService } from '../../common.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-citizenships-card',
  templateUrl: './citizenships-card.component.html',
  styleUrls: ['./citizenships-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitizenshipsCardComponent implements OnInit {
  @Input() model: Parent | Applicant | Child;

  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country> = [];

  constructor(public drawService: DrawService, private citizenshipService: CitizenshipService, private dialog: MatDialog,
    private commonService: CommonService, private inquiryService: InquiryService, private route: ActivatedRoute,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
  }

  edit() {
    let config = { $person: new BehaviorSubject<Parent | Applicant | Child>(this.model) };
    config.$person
      .pipe(skip(1), takeUntil(this.ngUnsubscribe))
      .subscribe((person: Parent | Applicant | Child) => {
        this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, person);
        this.cdr.markForCheck();
        // this.personService.update(person).subscribe(newPerson => {
        //   this.entity = newPerson;
        //   this.inquiryService.updateInquiryPropery(this.route.snapshot.data.resolved.inquiryId, this.entity);
        //   this.cdr.markForCheck();
        // });
      });
    this.dialog.open(EditCitizenshipsDialogComponent, this.commonService.getDialogConfig(config));
  }
}
