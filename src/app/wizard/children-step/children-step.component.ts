import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactory, ComponentFactoryResolver, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { SpecHealth } from '../../shared/index';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-children-step',
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css']
})
export class ChildrenStepComponent implements OnInit, AfterViewInit {

  //@ViewChildren(ChildComponent) childComponents: QueryList<ChildComponent>;
  @ViewChild("childContainer", { read: ViewContainerRef }) viewContainer;
  componentRef: ComponentRef<ChildComponent>;
  components: Array<ComponentRef<ChildComponent>> = [];
  specHealths: Array<SpecHealth> = [];

  children: Array<any> = [];
  constructor(private resolver: ComponentFactoryResolver, private cd: ChangeDetectorRef) { }

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
      return false;
      // if (!this.childrenForm) return false;
      // let control = this.childrenForm.get("specHealth");
      // return control.value != 101;
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
    // let remove = (component: ComponentRef<ChildComponent>) => {
    //   let removingComponent = this.components.find(x => x.instance.id == component.instance.id);
    //   let view = this.viewContainer.indexOf(removingComponent);
    //   this.viewContainer.remove(view);

    //   let index = this.components.findIndex(x => x.instance.id == component.instance.id);
    //   if (index == -1) return;
    //   this.components.splice(index, 1);
    //   select(this.components[this.components.length-1]);//set active last child;
    // }

    let remove = (()=>{
      let removeView = (component: ComponentRef<ChildComponent>)=>{
        let removingComponent = this.components.find(x => x.instance.id == component.instance.id);
        let view = this.viewContainer.indexOf(removingComponent);
        this.viewContainer.remove(view);
      }
      let removeComponent = (component: ComponentRef<ChildComponent>)=>{
        let index = this.components.findIndex(x => x.instance.id == component.instance.id);
        if (index == -1) return;
        this.components.splice(index, 1);
      }
      let setActiveChild = ()=>{
        select(this.components[this.components.length-1]);
      }
      return (component: ComponentRef<ChildComponent>)=>{
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
    this.navBarManager.add();
  }

  ngAfterViewInit() {
    this.cd.detectChanges();
  }
}
