import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild, ViewContainerRef, AfterViewInit } from "@angular/core";
import { isNullOrUndefined } from "util";
import { Child, CitizenshipService, ConfirmationDocument, IdentityCard, Person } from "../../../../../shared";
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

  components: Array<ComponentRef<ChildComponent>> = [];
  personTypes = PersonType;

  constructor(private resolver: ComponentFactoryResolver, private citizenshipService: CitizenshipService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.children.forEach((child, index) => {
      const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
      let componentRef = <ComponentRef<ChildComponent>>this.viewContainer.createComponent(factory);
      componentRef.instance.child = child;
      if (index + 1 == this.children.length)
        componentRef.instance.show.next(true);

      this.components.push(componentRef);
    });
    this.cdr.detectChanges();
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
            && isNullOrUndefined(this.specHealthComponent.documentComponents.find(x => !x.confirmationDocumentForm.valid));
        }
        if (this.specHealthComponent && this.specHealthComponent.specHealth == 101) {
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
      this.components.push(componentRef);
      //this.cdr.markForCheck();
    }
    let getTitle = (component: ComponentRef<ChildComponent>) => {
      const hasForm = component && component.instance.editPersonComponent.fullnameComponent && component.instance.editPersonComponent.fullnameComponent.fullnameForm;
      return hasForm && component.instance.editPersonComponent.fullnameComponent.fullnameForm.controls.firstname.value
        ? component.instance.editPersonComponent.fullnameComponent.fullnameForm.controls.firstname.value
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
      }
    })();
    return {
      add: add,
      remove: remove,
      select: select,
      getTitle: getTitle
    };
  })();

  getChildren(): Array<Child> {
    let buildPerson = (component: ComponentRef<ChildComponent>): Person => {
      const personForm = component.instance.editPersonComponent.fullnameComponent.fullnameForm;
      const birthInfoForm = this.birthInfoComponent.birthInfoForm;
      return new Person(personForm.value["lastname"],
        personForm.value["firstname"],
        personForm.value["middlename"],
        component.instance.editPersonComponent.snilsComponent.snils, personForm.value["noMiddlename"],
        birthInfoForm.value["birthDate"],
        birthInfoForm.value["birthPlace"],
        component.instance.editPersonComponent.genderComponent.gender);
    }
    let result = [];

    this.components.forEach((x, i) => {
      const specHealthDocument = this.specHealthComponent.specHealth == 101
        ? null
        : (() => {
          const form = this.specHealthComponent.documentComponents["_results"][i].confirmationDocumentForm;
          return new ConfirmationDocument(form.value["name"], form.value["series"], form.value["number"],
            form.value["dateIssue"], form.value["dateExpired"])
        })();
      const person = buildPerson(x);
      const identityCard = new IdentityCard(x.instance.editPersonComponent.identityCardComponent.identityCardForm);
      let child = new Child(person.lastname, person.firstname, person.middlename, person.snils, person.noMiddlename, person.birthDate, person.birthPlace,
        person.gender, this.editCitizenshipsComponent.citizenshipSelectComponent.citizenships, this.specHealthComponent.specHealth,
        specHealthDocument,
        identityCard, x.instance.disabledChild);

      (() => {
        Object.assign(child, this.citizenshipService.hasRfCitizenship(child.citizenships, this.editCitizenshipsComponent.citizenshipSelectComponent.countries)
          ? this.editCitizenshipsComponent.rfCitizensAddressesComponent.getResult()
          : this.editCitizenshipsComponent.foreignCitizensAddressesComponent.getResult());
      })();
      result.push(child);

    });
    return result;
  }
}