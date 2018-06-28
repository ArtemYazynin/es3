import { Component, OnInit, Input, ComponentFactoryResolver, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, OnDestroy } from '@angular/core';
import { Country, CitizenshipService, Entity } from '../../shared/index';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-citizenship-select',
  templateUrl: './citizenship-select.component.html',
  styleUrls: ['./citizenship-select.component.css']
})
export class CitizenshipSelectComponent implements OnInit, OnDestroy {
  @Input() countries: Array<Country> = [];
  @Input() citizenships: Array<Entity<string>> = [];
  @Input() components: Array<ComponentRef<CitizenshipSelectComponent>> = [];

  @Input() additionalCitizenshipsStorage: any;
  @ViewChild("viewContainer", { read: ViewContainerRef }) viewContainer;

  id: string;
  dynamic: boolean = false;

  citizenship: string = "";
  componentRef: ComponentRef<CitizenshipSelectComponent>;

  constructor(private citizenshipService: CitizenshipService, private resolver: ComponentFactoryResolver) { }

  add(): void {
    const factory: ComponentFactory<CitizenshipSelectComponent> = this.resolver.resolveComponentFactory(CitizenshipSelectComponent);
    this.componentRef = this.viewContainer.createComponent(factory);
    this.componentRef.instance.dynamic = true;
    this.componentRef.instance.countries = ((context) => {
      var newArray = context.countries.slice();
      newArray.splice(context.countries.findIndex(x => x.id === 0), 1);
      return newArray;
    })(this)
    this.componentRef.instance.citizenships = this.citizenships;
    this.componentRef.instance.components = this.components;
    this.componentRef.instance.additionalCitizenshipsStorage = this.viewContainer;
    this.components.push(this.componentRef);
  }
  remove(): void {
    const removingComp = this.components.find(x => { return x.instance.id == this.id; });
    const componentIndex = this.components.indexOf(removingComp);
    if (componentIndex !== -1) {
      this.additionalCitizenshipsStorage.remove(this.additionalCitizenshipsStorage.indexOf(removingComp));//remove view
      this.components.splice(componentIndex, 1);//remove component from list

      this.citizenships.splice(this.citizenships.findIndex(x => x.id == removingComp.instance.id), 1);
    }
  }
  ngOnDestroy() { if (this.componentRef) this.componentRef.destroy() }

  ngOnInit() {
    this.id = Math.random().toString(36).substring(2);
    if (this.countries.length === 0)
      this.citizenshipService.getCountries().subscribe(result => { this.countries = result; });
  }
  onChange(newValue) {
    const withoutCitizenships = newValue === 0;
    if (isNullOrUndefined(newValue) || newValue === "") {
      this.citizenships.splice(this.citizenships.findIndex(x => x.id == this.id), 1);
      return;
    }
    if (withoutCitizenships) {
      this.components.forEach(x => this.viewContainer.remove(this.viewContainer.indexOf(x)));
      this.components = [];
      this.citizenships = [];

      this.citizenships.push(new Entity(this.id, newValue));

      console.log("")
      this.citizenships.forEach(x => console.log(x));
      return;
    }

    if (this.citizenships.find(x => x.name == newValue)) {
      console.log("")
      this.citizenships.forEach(x => console.log(x));
      return;
    }


    let found: boolean = false;
    this.citizenships.forEach(val => {
      if (val.id == this.id) {
        val.name = newValue;
        found = true;
      }
    });
    if (!found) {
      this.citizenships.push(new Entity(this.id, newValue));
    }
    console.log("")
    this.citizenships.forEach(x => console.log(x));
  }
}
