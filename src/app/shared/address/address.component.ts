import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import { AddressService, Location } from '../../shared/index';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  addressForm: FormGroup;
  regions: Observable<Array<Location>>;
  cities:Observable<Array<Location>>;
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
        debounceTime(700),
        filter(x => (typeof x) != "object"))
      .subscribe(value => {
        this.regions = this.addressService.getRegions(value);
      });
    this.addressForm.patchValue({ region: "" });
  }
  displayFn(entity?: Location): string | undefined {
    return entity ? (entity.fullName || entity.name) : undefined;
  }
  onChange = (() => {
    const region = (e:MatAutocompleteSelectedEvent) => {
      const location = <Location>e.option.value;
    }
    const city = (e:MatAutocompleteSelectedEvent)=>{

    }
    return {
      region: region,
      city:city
    }
  })();
  private buildForm() {
    this.addressForm = this.fb.group({
      "region": [
        "",
        []
      ],
      "city": [
        "",
        []
      ]
    })
  }
}
