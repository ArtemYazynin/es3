import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, OnDestroy, OnChanges } from '@angular/core';
import { Country, CitizenshipService, Entity } from '../../shared/index';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-citizenship-select',
  templateUrl: './citizenship-select.component.html',
  styleUrls: ['./citizenship-select.component.css']
})
export class CitizenshipSelectComponent implements OnInit {
  countries: Array<Country> = [];
  citizenships: Array<number> = [];

  constructor(private citizenshipService: CitizenshipService, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.citizenshipService.getCountries().subscribe(result => { this.countries = result; });
  }
  onChange(arrayOfCitizenships) {
    const withoutCitizenships = 0;
    for (let index = 0, len = arrayOfCitizenships.length; index < len; index++) {
      if (arrayOfCitizenships[index] === withoutCitizenships) {
        this.citizenships = [withoutCitizenships];
        break;
      }

    }
  }
}
