import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Child } from '../../models/child.model';
import { Parent, Applicant, Country, CitizenshipService } from '../../index';
import { DrawService } from '../../draw.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
  
  constructor(public drawService: DrawService, private citizenshipService:CitizenshipService) { }

  ngOnInit() {
    this.citizenshipService.getCountries()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(data => {
        this.countries = data;
      });
  }

  edit(){
    
  }
}
