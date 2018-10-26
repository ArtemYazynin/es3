import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { CitizenshipService, Country } from '../../index';

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

  constructor(private citizenshipService: CitizenshipService) { }

  ngOnInit() {
    this.citizenshipService.getCountries().subscribe(result => { this.countries = result; });
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
    return this.citizenships.indexOf(643) >= 0;
  }

}
