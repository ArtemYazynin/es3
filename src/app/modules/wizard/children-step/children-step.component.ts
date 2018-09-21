import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { Child, CitizenshipService, ConfirmationDocument, DublicatesFinder, FormService, IdentityCard, Inquiry, Person } from '../../../shared';
import { BirthInfoComponent } from '../../../shared/components/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../../shared/components/citizenship-select/citizenship-select.component';
import { ForeignCitizensAddressesComponent } from '../../../shared/components/foreign-citizens-addresses/foreign-citizens-addresses.component';
import { IdentityCardComponent } from '../../../shared/components/identity-card/identity-card.component';
import { RfCitizensAddressesComponent } from '../../../shared/components/rf-citizens-addresses/rf-citizens-addresses.component';
import { SpecHealthComponent } from '../../../shared/components/spec-health/spec-health.component';
import { StepBase, WizardStorageService } from '../shared';
import { ChildComponent } from './child/child.component';


@Component({
  selector: 'app-children-step',
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css'],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild("childContainer", { read: ViewContainerRef }) viewContainer;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(SpecHealthComponent) specHealthComponent: SpecHealthComponent;
  @ViewChild(RfCitizensAddressesComponent) rfAddressesComponent: RfCitizensAddressesComponent;
  @ViewChild(ForeignCitizensAddressesComponent) foreignAddressesComponent: ForeignCitizensAddressesComponent;
  private inquiry: Inquiry;
  components: Array<ComponentRef<ChildComponent>> = [];
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private route: ActivatedRoute, private router: Router, private resolver: ComponentFactoryResolver, private storageService: WizardStorageService,
    private cdr: ChangeDetectorRef, private formService: FormService, private citizenshipService: CitizenshipService) { }

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
        return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.length > 0;
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
  isAvailable = (() => {
    const hasRfCitizenship = () => {
      return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.indexOf(643) >= 0;
    }
    const addresses = () => {
      return this.citizenshipSelectComponent.citizenships.length > 0;
    }
    return {
      addresses: addresses,
      hasRfCitizenship: hasRfCitizenship,
    }
  })();
  navBarManager = (() => {
    let hideChildren = () => {
      if (!this.components) return;
      this.components.forEach(x => x.instance.show = false);
    }
    let select = (component: ComponentRef<ChildComponent>) => {
      if (!component) return;
      hideChildren();
      component.instance.show = true;

    }
    let add = () => {
      if (!this.components) return;
      hideChildren()
      const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
      let componentRef = this.viewContainer.createComponent(factory);
      componentRef.instance.show = true;
      componentRef.instance.inquiryType = this.inquiryType;
      this.components.push(componentRef);
      this.cdr.detectChanges();
    }
    let getTitle = (component: ComponentRef<ChildComponent>) => {
      return component && component.instance.fullnameComponent && component.instance.fullnameComponent.fullnameForm
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
  goTo = (() => {
    return {
      back: () => {
        this.router.navigate(["/"]);
      },
      next: () => {
        let children = this.getChildren();
        if (DublicatesFinder.betweenChildren(children)) return true;

        this.storageService.set(this.inquiryType, { children: children })
        this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
      }
    }
  })();

  private getChildren(): Array<Child> {
    let buildPerson = (component: ComponentRef<ChildComponent>): Person => {
      const personForm = component.instance.fullnameComponent.fullnameForm;
      const birthInfoForm = this.birthInfoComponent.birthInfoForm;
      return new Person(personForm.value["lastname"],
        personForm.value["firstname"],
        personForm.value["middlename"],
        component.instance.snilsComponent.snils, personForm.value["noMiddlename"],
        birthInfoForm.value["birthDate"],
        birthInfoForm.value["birthPlace"],
        component.instance.genderComponent.gender);
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
      const identityCard = new IdentityCard(x.instance.identityCardComponent.identityCardForm);
      let child = new Child(person.lastname, person.firstname, person.middlename, person.snils, person.noMiddlename, person.birthDate, person.birthPlace,
        person.gender, this.citizenshipSelectComponent.citizenships, this.specHealthComponent.specHealth,
        specHealthDocument,
        identityCard, x.instance.disabledChild);

      (() => {
        const randomChild = this.inquiry.children ? this.inquiry.children[i] : undefined;
        Object.assign(child, this.citizenshipService.hasRfCitizenship(child.citizenships, this.citizenshipSelectComponent.countries)
          ? this.rfAddressesComponent.getResult(randomChild)
          : this.foreignAddressesComponent.getResult(randomChild));
      })();
      result.push(child);

    });
    return result;
  }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
  }

  ngAfterViewInit() {
    if (!this.inquiry || !this.inquiry.children || this.inquiry.children.length == 0) {
      this.navBarManager.add();
    } else {
      this.initFromSessionStorage();
    }

    this.components.forEach((component) => {
      component.instance.identityCardComponent.identityCardForm.controls.dateIssue.valueChanges
        .subscribe(() => this.birthInfoComponent.compareBirthAndIssueDate());
    })
  }

  getIdentityCardComponent(): IdentityCardComponent {
    for (let index = 0, len = this.components.length; index < len; index++)
      if (this.components[index].instance.show)
        return this.components[index].instance.identityCardComponent;
    return null;
  }

  private initFromSessionStorage() {
    const child = this.inquiry.children[0];
    this.birthInfoComponent.birthInfoForm.patchValue({
      birthDate: child.birthDate,
      birthPlace: child.birthPlace
    });
    this.specHealthComponent.specHealth = child.specHealth;
    //this.citizenshipSelectComponent.citizenships = child.citizenships;
    (() => {//initChildrenComponents
      this.inquiry.children.forEach((child, index) => {
        const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
        let componentRef = <ComponentRef<ChildComponent>>this.viewContainer.createComponent(factory);
        componentRef.instance.child = child;
        if (index + 1 == this.inquiry.children.length)
          componentRef.instance.show = true;

        this.components.push(componentRef);
      });
      this.cdr.detectChanges();
    })();
    (function initSpecHealthDocuments(outer) {
      if (outer.specHealthComponent.specHealth == 101) return;
      outer.specHealthComponent.documentComponents.forEach((document, i) => {
        let child = outer.inquiry.children[i];
        document.confirmationDocumentForm.patchValue({
          name: child.specHealthDocument.name,
          series: child.specHealthDocument.series,
          number: child.specHealthDocument.number,
          dateIssue: child.specHealthDocument.dateIssue,
          dateExpired: child.specHealthDocument.dateExpired
        });
      });
      outer.cdr.detectChanges();
    })(this);
  }
}
