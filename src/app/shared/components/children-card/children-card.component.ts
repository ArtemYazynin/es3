import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DrawService, Child, Country, CitizenshipService } from '../..';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenCardComponent implements OnInit {
  @Input() children: Array<Child>;

  private ngUnsubscribe: Subject<any> = new Subject();
  countries: Array<Country> = [];
  constructor(public drawService: DrawService, private citizenshipService: CitizenshipService) { }

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
