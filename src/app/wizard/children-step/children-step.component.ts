import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SpecHealth, SpecHealthService, FormService, Person, Parent, Country, CitizenshipService } from '../../shared/index';
import { ChildComponent } from './child/child.component';
import { BirthInfoComponent } from '../../person/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';

@Component({
  selector: 'app-children-step',
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css']
})
export class ChildrenStepComponent implements OnInit, AfterViewInit {
  @ViewChild("childContainer", { read: ViewContainerRef }) viewContainer;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  componentRef: ComponentRef<ChildComponent>;
  components: Array<ComponentRef<ChildComponent>> = [];
  specHealths: Array<SpecHealth> = [];
  countries: Array<Country> = [];

  childrenForm: FormGroup;
  formErrors = Object.assign({}, Person.getFormErrorsTemplate(), Parent.getFormErrorsTemplate());
  validationMessages = Object.assign({}, Person.getvalidationMessages(), Parent.getvalidationMessages());

  constructor(private resolver: ComponentFactoryResolver, private cd: ChangeDetectorRef,
    private formService: FormService, private fb: FormBuilder, private specHealthService: SpecHealthService,
    private citizenshipService: CitizenshipService) { }

  isValid(): boolean {
    return false;
    // let isValid = {
    //   childrenForm: this.childrenForm && this.childrenForm.valid || false,
    //   identityCardForm: this.identityCardComponent
    //     && this.identityCardComponent.identityCardForm
    //     && this.identityCardComponent.identityCardForm.valid
    //     || false,
    //   fullnameForm: this.fullnameComponent && this.fullnameComponent.fullnameForm && this.fullnameComponent.fullnameForm.valid || false,
    //   birthInfoForm: this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false,
    // }
    // return isValid.childrenForm && isValid.fullnameForm && isValid.identityCardForm && isValid.birthInfoForm;
  }
  isAvailable = {
    specHealthDocument: () => {
      return this.childrenForm && this.childrenForm.value["specHealth"] != 101 || false;
    }
  }
  navBarManager = ((context) => {
    let hideChildren = () => {
      this.components.forEach(x => x.instance.show = false);
    }
    let select = (component: ComponentRef<ChildComponent>) => {
      hideChildren();
      component.instance.show = true;
    }
    let add = () => {
      hideChildren()
      const factory: ComponentFactory<ChildComponent> = context.resolver.resolveComponentFactory(ChildComponent);
      context.componentRef = context.viewContainer.createComponent(factory);
      context.componentRef.instance.show = true;
      context.components.push(context.componentRef);
    }
    let getTitle = (component: ComponentRef<ChildComponent>) => {
      return component.instance.fullnameComponent && component.instance.fullnameComponent.fullnameForm
        && component.instance.fullnameComponent.fullnameForm.value["firstname"]
        ? component.instance.fullnameComponent.fullnameForm.value["firstname"]
        : "Ребёнок";
    }

    let remove = (() => {
      let removeView = (component: ComponentRef<ChildComponent>) => {
        let removingComponent = this.components.find(x => x.instance.id == component.instance.id);
        let view = this.viewContainer.indexOf(removingComponent);
        this.viewContainer.remove(view);
      }
      let removeComponent = (component: ComponentRef<ChildComponent>) => {
        let index = this.components.findIndex(x => x.instance.id == component.instance.id);
        if (index == -1) return;
        this.components.splice(index, 1);
      }
      let setActiveChild = () => {
        select(this.components[this.components.length - 1]);
      }
      return (component: ComponentRef<ChildComponent>) => {
        removeView(component);
        removeComponent(component);
        setActiveChild();
      }
    })();
    return {
      add: add,
      remove: remove,
      select: select,
      getTitle: getTitle
    };
  })(this);
  ngOnInit() {
    this.citizenshipService.getCountries().subscribe(result => { this.countries = result; });
    this.specHealthService.get().subscribe(result => { this.specHealths = result; });
    this.navBarManager.add();

    this.buildForm();
  }
  private buildForm() {
    this.childrenForm = this.fb.group({
      "citizenship": [
        "",
        [
          Validators.required
        ]
      ],
      "specHealth": [
        101,
        []
      ]
    });
    this.childrenForm.valueChanges.subscribe(data => this.formService.onValueChange(this.childrenForm, this.formErrors, this.validationMessages));
    this.formService.onValueChange(this.childrenForm, this.formErrors, this.validationMessages);
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
