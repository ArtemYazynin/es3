import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CitizenshipService, Country, CountryService } from '../../index';

@Component({
  selector: 'app-citizenship-select',
  templateUrl: './citizenship-select.component.html',
  styleUrls: ['./citizenship-select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CitizenshipSelectComponent implements OnInit {
  private _citizenships: Array<number> = [];
  @Input() set citizenships(value) {
    if (value) {
      this._citizenships = value;
    }
  }

  get citizenships() {
    return this._citizenships;
  }
  countries: Array<Country> = [];

  constructor(private citizenshipService: CitizenshipService, private countryService:CountryService) { }

  ngOnInit() {
    this.countryService.gets().subscribe(result => { this.countries = result; });
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

  hasRfCitizenship(){
    return this.hasCitizenships() && this.citizenships.indexOf(643) >= 0;
  }

  hasForeignCitizenship(){
    return this.hasCitizenships() && this.citizenshipService.hasForeignCitizenship(this.citizenships, this.countries);
  }

  private hasCitizenships(){
    return this.citizenships.length > 0;
  }
}
