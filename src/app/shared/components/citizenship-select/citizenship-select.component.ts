import { ChangeDetectionStrategy, Component, Input, OnInit, ChangeDetectorRef } from '@angular/core';
import { CitizenshipService, Country, Theme } from '../../index';
import { CountryService } from '../../country.service';

@Component({
  selector: 'app-citizenship-select',
  templateUrl: './citizenship-select.component.html',
  styleUrls: ['./citizenship-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
 
})
export class CitizenshipSelectComponent implements OnInit {
  private _citizenships: Array<number> = [];
  themes = Theme;
  @Input() set citizenships(value) {
    if (value) {
      this._citizenships = value;
    }
  }

  get citizenships() {
    return this._citizenships;
  }
  countries: Array<Country> = [];

  constructor(private countryService: CountryService, private citizenshipService: CitizenshipService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.countryService.gets().subscribe(result => { 
      this.countries = result; 
      this.cdr.markForCheck();
    });
  }
  onChange(citienships) {
    const withoutCitizenships = 0;
    for (let index = 0, len = citienships.length; index < len; index++) {
      if (citienships[index] === withoutCitizenships) {
        this.citizenships = [withoutCitizenships];
        break;
      }
    }
  }

  hasRfCitizenship() {
    return this.hasCitizenships() && this.citizenships.indexOf(643) >= 0;
  }

  hasForeignCitizenship() {
    return this.hasCitizenships() && this.citizenshipService.hasForeignCitizenship(this.citizenships, this.countries);
  }

  private hasCitizenships() {
    return this.citizenships.length > 0;
  }
}
