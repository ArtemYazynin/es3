import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Applicant, Child, CitizenshipService, Country, DrawService, Parent } from '../../../shared';

@Component({
  selector: 'app-person-view',
  templateUrl: './person-view.component.html',
  styleUrls: ['./person-view.component.css']
})
export class PersonViewComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() entity: Applicant | Parent | Child

  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country> = [];
  drawManager = this.drawService

  constructor(private citizenshipService: CitizenshipService, private drawService: DrawService) { }

  ngOnInit() {
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
}
