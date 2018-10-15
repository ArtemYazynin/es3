import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Child, CitizenshipService, Country, DrawService } from '../..';

@Component({
  selector: 'app-children-card',
  templateUrl: './children-card.component.html',
  styleUrls: ['./children-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenCardComponent implements OnInit {
  @Input() children: Array<Child>;
  @Input() edit: () => void;

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
