import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { DrawService, Child, Country, CitizenshipService, SpecHealth, BehaviorMode } from '../..';
import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { PersonType } from '../../person-type.enum';
import { SpecHealthService } from '../../spec-health.service';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenCardComponent implements OnInit {
  @Input() children: Array<Child>;

  private ngUnsubscribe: Subject<any> = new Subject();
  modes = BehaviorMode;
  $specHealth: Observable<SpecHealth>;
  countries: Array<Country> = [];
  personTypes = PersonType;
  constructor(public drawService: DrawService, private citizenshipService: CitizenshipService, private specHealthService: SpecHealthService) { }

  ngOnInit() {
    this.$specHealth = this.specHealthService.get(this.children[0].specHealth).pipe(takeUntil(this.ngUnsubscribe), map(x=>x[0]));
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
