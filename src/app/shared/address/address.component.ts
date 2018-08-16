import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, pipe } from 'rxjs';
import { debounceTime, takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import { AddressService, Location } from '..';
import { MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  addressForm: FormGroup;
  private debounceTime = 700;
  regionChildTypes = {
    district: 0,
    city: 1
  }
  regions: Observable<Array<Location>>;
  cities: Observable<Array<Location>>;
  constructor(private addressService: AddressService, private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit() {
    this.buildForm();
    this.addressForm.controls.region.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime),
        filter(x => (typeof x) != "object"))
      .subscribe(value => {
        this.regions = this.addressService.getRegions(value);
      });
    this.addressForm.controls.city.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.cities = this.addressService.getCities(this.addressForm.controls.region.value,value);
      });
  }
  displayFn(entity?: Location): string | undefined {
    return entity ? (entity.fullName || entity.name) : undefined;
  }
  onChange = (() => {
    const region = (e: MatAutocompleteSelectedEvent) => {
      if (!!e.option.value == false) return;
      const location = <Location>e.option.value;
    }
    const city = (e: MatAutocompleteSelectedEvent) => {

    }
    const regionChildType = (e: MatSelectChange) => {


    }
    return {
      region: region,
      regionChildType: regionChildType,
      city: city
    }
  })();
  private buildForm() {
    this.addressForm = this.fb.group({
      "region": [
        "",
        []
      ],
      "district": [
        "",
        []
      ],
      "city": [
        "",
        []
      ],
      "street": [
        "",
        []
      ],
      "building": [
        "",
        []
      ],
      "regionChildType": [
        "",
        []
      ],
    })
  }

  hasRegion() {
    return (typeof this.addressForm.controls.region.value) == "object";
  }
}
