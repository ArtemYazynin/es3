import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { Observable, Subject, pipe } from 'rxjs';
import { debounceTime, takeUntil, filter, distinctUntilChanged } from 'rxjs/operators';
import { AddressService, Location } from '..';
import { MatAutocompleteSelectedEvent, MatSelectChange } from '@angular/material';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {

  private ngUnsubscribe: Subject<any> = new Subject();
  addressForm: FormGroup;
  private debounceTime = 300;
  regionChildTypes = {
    district: 0,
    city: 1
  }
  regions: Observable<Array<Location>>;
  cities: Observable<Array<Location>>;
  districts: Observable<Array<Location>>;
  streets: Observable<Array<Location>>;
  buildings: Observable<Array<Location>>;
  constructor(private addressService: AddressService, private fb: FormBuilder) { }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  selected = {
    region: () => {
      return (typeof this.addressForm.controls.region.value) == "object";
    },
    districtType: () => {
      if (this.addressForm.controls.regionChildType.value == "") return false;
      return this.addressForm.controls.regionChildType.value == this.regionChildTypes.district;
    },
    cityTypeOrDistrict: () => {
      return this.addressForm.controls.regionChildType.value == this.regionChildTypes.city
        || (typeof this.addressForm.controls.district.value) == "object";
    },
    city: () => {
      return (typeof this.addressForm.controls.city.value) == "object";
    },
    street: () => {
      return (typeof this.addressForm.controls.street.value) == "object";
    },
  }

  placeHolder = (() => {
    const get = (control: AbstractControl, defaultValue: string) => {
      return (typeof control.value) == "object"
        ? control.value.type
        : defaultValue;
    }
    return {
      region: () => {
        return get(this.addressForm.controls.region, "Регион");
      },
      district: () => {
        return get(this.addressForm.controls.district, "Район");
      },
      city: () => {
        return get(this.addressForm.controls.city, "Город");
      },
      street: () => {
        return get(this.addressForm.controls.street, "Улица");
      },
      building: () => {
        return get(this.addressForm.controls.building, "Дом");
      },
    }
  })();

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
        const control = (typeof this.addressForm.controls.district.value) == "object"
          ? this.addressForm.controls.district.value
          : this.addressForm.controls.region.value
        this.cities = this.addressService.getCities(control, value);
      });
    this.addressForm.controls.district.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.districts = this.addressService.getDistricts(this.addressForm.controls.region.value, value);
      });
    this.addressForm.controls.street.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.streets = this.addressService.getStreets(this.addressForm.controls.city.value, value);
      });
    this.addressForm.controls.building.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.buildings = this.addressService.getBuildings(this.addressForm.controls.street.value, value);
      });
  }
  display = {
    region: (entity?: Location) => {
      return entity.fullName || entity.name
    },
    other: (entity?: Location) => {
      return entity
        ? entity.typeShort ? (entity.typeShort + ".").concat(entity.name) : ""
        : undefined;
    }
  }
  onChange = (() => {
    const clearForm = (form: FormGroup, except: string) => {
      if (isNullOrUndefined(form)
        || isNullOrUndefined(except)
        || except == "") return;
      except = except.trim();
      for (const key in form.controls) {
        if (form.controls.hasOwnProperty(key)) {
          if (key == except) continue;
          form.controls[key].patchValue("");
        }
      }
    }
    const region = (context: AddressComponent, e: MatAutocompleteSelectedEvent) => {
      if (!!e.option.value == false) return;
      clearForm(context.addressForm, "region");
    }
    const city = (context: AddressComponent, e: MatAutocompleteSelectedEvent) => {
      clearForm(context.addressForm, "city");
    }
    const district = (context: AddressComponent, e: MatAutocompleteSelectedEvent) => {

    }
    const regionChildType = (context: AddressComponent, e: MatSelectChange) => {

    }
    const street = (context: AddressComponent, e: MatSelectChange) => {

    }
    const building = (context: AddressComponent, e: MatSelectChange) => {

    }

    return {
      region: region,
      regionChildType: regionChildType,
      city: city,
      district: district,
      street: street,
      building: building
    }
  })();
  private buildForm() {
    this.addressForm = this.fb.group({
      "region": [
        "",
        []
      ],
      "regionChildType": [
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

    })
  }


}
