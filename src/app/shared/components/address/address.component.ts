import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, fromEvent, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Address, AddressService, Applicant, DrawService, Location, locationTypes, Parent } from '../../index';
import { addressTypes } from "../../models/address-type";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host:{ 'class': 'host'},
})
export class AddressComponent implements OnInit, OnDestroy {
  @Input() type: number;
  @Input() owner: Parent | Applicant;

  $address: BehaviorSubject<Address> = new BehaviorSubject<Address>(null);
  addressTypes = addressTypes;
  modes = { read: 1, edit: 2 }
  mode = this.modes.read;
  private debounceTime = 300;
  private addressType: string;

  private ngUnsubscribe: Subject<any> = new Subject();
  addressForm: FormGroup;
  regionChildTypes = { district: "0", city: "1" }
  regions: Observable<Array<Location>>;
  cities: Observable<Array<Location>>;
  districts: Observable<Array<Location>>;
  streets: Observable<Array<Location>>;
  buildings: Observable<Array<Location>>;
  customStreet = false;

  constructor(private addressService: AddressService, private fb: FormBuilder, private drawService: DrawService, private cdr: ChangeDetectorRef) { }

  drawManager = this.drawService;
  drawnAddress: string;

  drawAddress() {
    this.drawnAddress = this.drawManager.address(this.$address.getValue());
    this.cdr.markForCheck();
  }

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
      return (typeof control.value) == "object" && control.value.type
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
        this.cdr.markForCheck();
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
        this.cdr.markForCheck();
      });
    this.addressForm.controls.district.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.districts = this.addressService.getDistricts(this.addressForm.controls.region.value, value);
        this.cdr.markForCheck();
      });
    this.addressForm.controls.street.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.streets = this.addressService.getStreets(this.addressForm.controls.city.value, value);
        this.cdr.markForCheck();
      });
    this.addressForm.controls.building.valueChanges
      .pipe(
        takeUntil(this.ngUnsubscribe),
        distinctUntilChanged(),
        debounceTime(this.debounceTime))
      .subscribe(value => {
        this.buildings = this.addressService.getBuildings(this.addressForm.controls.street.value, value);
        this.cdr.markForCheck();
      });
    this.addressType = (() => {
      for (const key in addressTypes) {
        if (addressTypes.hasOwnProperty(key)) {
          const element = addressTypes[key];
          if (element == this.type) {
            return key;
          }
        }
      }
    })();
    if (this.owner) this.$address.next(this.owner[this.addressType]);
    if (this.$address.getValue()) {
      this.updateForm();
      this.drawAddress();
    }
  }

  onSubmit = () => {
    this.mode = this.modes.read;
    if (!this.addressForm.controls.region.value || this.addressForm.controls.region.value == "") {
      this.$address.next(undefined);
      this.drawAddress();
    }
    else {
      let street: Location = this.addressForm.controls.street.value;
      let building: Location = this.addressForm.controls.building.value;
      if (typeof street == "string") {
        street = new Location();
        street.name = this.addressForm.controls.street.value;
        street.typeShort = "";
        this.addressForm.controls.street.setValue(street);
      }
      if (typeof building == "string") {
        building = new Location();
        building.name = this.addressForm.controls.building.value;
        this.addressForm.controls.building.setValue(building);
      }
      //if (!this.addressForm.controls.region.value) return;
      this.$address.next(new Address(<Location>this.addressForm.controls.region.value, this.addressForm.controls.district.value, this.addressForm.controls.city.value,
        street, building, this.addressForm.controls.flat.value, this.addressForm.controls.additionalInfo.value, false));

      this.drawAddress();
    }
  }

  display = {
    region: (entity?: Location) => {
      return entity ? entity.fullName ? entity.fullName : entity.name : undefined;
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
      additionalInfo: [
        "",
        ""
      ]
    })
  }

  private updateForm() {
    let address = this.$address.getValue();
    this.addressForm.patchValue({
      region: address.region ? address.region : undefined,
      regionChildType: address.city ? this.regionChildTypes.city : (address.district ? this.regionChildTypes.district : undefined),
      city: address.city ? address.city : undefined,
      district: address.district ? address.district : undefined,
      street: address.street && typeof address.street ? address.street : undefined,
      building: address.building && typeof address.street ? address.building : undefined,
      flat: address.flat ? address.flat : undefined,
      additionalInfo: address.additionalInfo ? address.additionalInfo : undefined
    });
  }
}