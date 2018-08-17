import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subject, of, fromEvent, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { AddressService, Location } from "../../shared/index";
import { locationTypes } from "../../shared/location-type";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() type: number;
  private ngUnsubscribe: Subject<any> = new Subject();
  private debounceTime = 300;
  addressForm: FormGroup;
  regionChildTypes = { district: 0, city: 1 }
  regions: Observable<Array<Location>>;
  cities: Observable<Array<Location>>;
  districts: Observable<Array<Location>>;
  streets: Observable<Array<Location>>;
  buildings: Observable<Array<Location>>;
  customStreet = false;
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
      return (typeof this.addressForm.controls.street.value) == "object"
        || (!!this.customStreet && !!this.addressForm.controls.street.value);
    },
    building: () => {
      return (typeof this.addressForm.controls.building.value) == "object"
        || (!!this.customStreet && !!this.addressForm.controls.building.value);
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
        ? entity.typeShort ? (entity.typeShort + ".").concat(entity.name) : entity.name
        : undefined;
    }
  }
  onChange = (() => {
    const clearForm = (form: FormGroup, except: Array<string>) => {
      if (isNullOrUndefined(form) || isNullOrUndefined(except)) return;
      const difference = getDifference(Object.keys(form.controls), except)
      difference.forEach(key => {
        if (!!form.controls[key].value) form.controls[key].patchValue("");
      });
    }
    const getDifference = (a: Array<string>, b: Array<string>) => {
      let result = [];
      for (let index = 0, len = a.length; index < len; index++) {
        const element = a[index];
        if (b.indexOf(a[index]) >= 0) continue;
        result.push(element);
      }
      return result;
    }
    const region = (context: AddressComponent) => {
      clearForm(context.addressForm, [locationTypes.region]);
    }
    const regionChildType = (context: AddressComponent) => {
      clearForm(context.addressForm, [locationTypes.region, "regionChildType"]);
    }
    const city = (context: AddressComponent) => {
      clearForm(context.addressForm, [locationTypes.region, "regionChildType", locationTypes.district, locationTypes.city]);
      setTimeout(() => {
        fromEvent(document.getElementById("cityToggle"), "click")
          .pipe(takeUntil(this.ngUnsubscribe))
          .subscribe(x => {
            this.customStreet = !this.customStreet;
            clearForm(context.addressForm, [locationTypes.region, "regionChildType", locationTypes.district, locationTypes.city]);
          });
      }, 0);
    }
    const district = (context: AddressComponent) => {
      clearForm(context.addressForm, [locationTypes.region, "regionChildType", locationTypes.district]);
    }

    const street = (context: AddressComponent) => {
      clearForm(context.addressForm, [locationTypes.region, "regionChildType", locationTypes.district, locationTypes.city, locationTypes.street]);
    }
    const building = (context: AddressComponent) => {
      clearForm(context.addressForm, [locationTypes.region, "regionChildType", locationTypes.district, locationTypes.city, locationTypes.street, locationTypes.building]);
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
      region: [
        "",
        []
      ],
      regionChildType: [
        "",
        []
      ],
      district: [
        "",
        []
      ],
      city: [
        "",
        []
      ],
      street: [
        "",
        []
      ],
      building: [
        "",
        []
      ],
      flat: [
        "",
        []
      ],
    })
  }
}
