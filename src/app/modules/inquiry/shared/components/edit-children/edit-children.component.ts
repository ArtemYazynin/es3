import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { isNullOrUndefined } from "util";
import { ApplicantType, Child, CitizenshipService, ConfirmationDocument, IdentityCard, Person, SpecHealth, Theme } from "../../../../../shared";
import { BirthInfoComponent } from "../../../../../shared/components/birth-info/birth-info.component";
import { SpecHealthComponent } from "../../../../../shared/components/spec-health/spec-health.component";
import { PersonType } from "../../../../../shared/person-type.enum";
import { ChildComponent } from "../../../../wizard/children-step/child/child.component";
import { EditCitizenshipsComponent } from "../edit-citizenships/edit-citizenships.component";



@Component({
  selector: 'app-edit-children',
  templateUrl: './edit-children.component.html',
  styleUrls: ['./edit-children.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditChildrenComponent implements OnInit, AfterViewInit {
  @ViewChild("childContainer", { read: ViewContainerRef }) viewContainer;
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(SpecHealthComponent) specHealthComponent: SpecHealthComponent;

  @Input() children: Array<Child>;
  @Input() inquiryType: any;
  @Input() owner: any;
  @Input() specHealth: SpecHealth;

  components: Array<ComponentRef<ChildComponent>> = [];
  personTypes = PersonType;
  applicantTypes = ApplicantType;
  themes = Theme;

  constructor(private resolver: ComponentFactoryResolver, private citizenshipService: CitizenshipService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.children.forEach((child, index) => {
      const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
      let componentRef = <ComponentRef<ChildComponent>>this.viewContainer.createComponent(factory);
      componentRef.instance.child = child;
      componentRef.instance.inquiryType = this.inquiryType;
      if (index + 1 == this.children.length)
        componentRef.instance.show.next(true);

      this.components.push(componentRef);
    });
    this.cdr.markForCheck();
  }

  ngAfterViewInit(): void {
    this.cdr.markForCheck();
  }

  private hasCitizenships() {
    return this.editCitizenshipsComponent.citizenshipSelectComponent.citizenships.length > 0;
  }
  isValid(): boolean {
    let isValid = {
      children: (): boolean => {
        let result = this.components && this.components.every(x => x.instance.isValid());
        return result;
      },
      birthInfo: (): boolean => {
        return this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid;
      },
      citizenships: (): boolean => {
        return this.hasCitizenships();
      },
      specHealthDocument: () => {
        const specHealthsDocumentsValid = (): boolean => {
          return this.specHealthComponent
            && this.specHealthComponent.documentComponents
            && this.specHealthComponent.documentComponents.length == this.components.length
            && isNullOrUndefined(this.specHealthComponent.documentComponents.find(x => !x.form.valid));
        }
        if (this.specHealthComponent && this.specHealthComponent.specHealth && this.specHealthComponent.specHealth.code == 101) {
          return true;
        } else if (specHealthsDocumentsValid()) {
          return true;
        } else {
          return false;
        }
      }
    }
    return isValid.children() && isValid.birthInfo() && isValid.citizenships() && isValid.specHealthDocument();
  }
  navBarManager = (() => {
    let hideChildren = () => {
      if (!this.components) return;
      this.components.forEach(x => x.instance.show.next(false));
    }
    let select = (component: ComponentRef<ChildComponent>) => {
      if (!component) return;
      hideChildren();
      component.instance.show.next(true);
    }
    let add = () => {
      if (!this.components) return;
      hideChildren()
      const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
      let componentRef = this.viewContainer.createComponent(factory);
      componentRef.instance.show.next(true);
      componentRef.instance.inquiryType = this.inquiryType;
      if (this.components.length > 0) {
        componentRef.instance.child = new Child(this.components[0].instance.editPersonComponent.fullnameComponent.fullnameForm.controls.lastname.value, undefined, undefined,
          undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
      }
      this.components.push(componentRef);
    }
    let getTitle = (componentRef: ComponentRef<ChildComponent>) => {
      const hasForm = componentRef && componentRef.instance.editPersonComponent && componentRef.instance.editPersonComponent.fullnameComponent && componentRef.instance.editPersonComponent.fullnameComponent.fullnameForm;
      return hasForm && componentRef.instance.editPersonComponent.fullnameComponent.fullnameForm.controls.firstname.value
        ? componentRef.instance.editPersonComponent.fullnameComponent.fullnameForm.controls.firstname.value
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
        if (!component || !this.components || !this.viewContainer) return;
        removeView(component);
        removeComponent(component);
        setActiveChild();
        setTimeout(() => {
          this.cdr.markForCheck();
        });
      }
    })();
    return {
      add: add,
      remove: remove,
      select: select,
      getTitle: getTitle
    };
  })();

  getResult(): { children: Array<Child>, specHealth: SpecHealth } {
    let buildPerson = (component: ComponentRef<ChildComponent>): Person => {
      let person = component.instance.editPersonComponent.getResult();
      person.birthDate = this.birthInfoComponent.birthInfoForm.controls.birthDate.value;
      person.birthPlace = this.birthInfoComponent.birthInfoForm.controls.birthPlace.value;
      return person;
    }
    let result = { children: [], specHealth: undefined };

    this.components.forEach((x, i) => {
      const specHealthDocument = this.specHealthComponent.specHealth.code == 101
        ? null
        : (() => {
          const form = this.specHealthComponent.documentComponents["_results"][i].confirmationDocumentForm;
          return ConfirmationDocument.construct(form);
        })();
      const person = buildPerson(x);
      const identityCard = new IdentityCard(x.instance.editPersonComponent.identityCardComponent.identityCardForm);
      let child = new Child(person.lastname, person.firstname, person.middlename, person.snils, person.noMiddlename, person.birthDate, person.birthPlace,
        person.gender, this.editCitizenshipsComponent.citizenshipSelectComponent.citizenships, specHealthDocument, identityCard);
      child.disabledChild = x.instance.disabilityComponent.disabledChild;
      child.disabilityType = x.instance.disabilityComponent.disabilityType;

      (() => {
        Object.assign(child, this.citizenshipService.hasRfCitizenship(child.citizenships, this.editCitizenshipsComponent.citizenshipSelectComponent.countries)
          ? this.editCitizenshipsComponent.rfCitizensAddressesComponent && this.editCitizenshipsComponent.rfCitizensAddressesComponent.getResult()
          : this.editCitizenshipsComponent.foreignCitizensAddressesComponent && this.editCitizenshipsComponent.foreignCitizensAddressesComponent.getResult());
      })();
      result.children.push(child);

    });
    result.specHealth = this.specHealthComponent.specHealth;
    return result;
  }
}