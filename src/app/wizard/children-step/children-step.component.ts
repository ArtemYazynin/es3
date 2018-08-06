import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';
import { BirthInfoComponent } from '../../person/birth-info/birth-info.component';
import { CitizenshipSelectComponent } from '../../person/citizenship-select/citizenship-select.component';
import { Child, CitizenshipService, CommonService, CompilationOfWizardSteps, ConfirmationDocument, FormService, IdentityCard, Person, StepBase, WizardStorageService } from '../../shared';
import { SpecHealthComponent } from '../../spec-health/spec-health.component';
import { ChildComponent } from './child/child.component';

@Component({
  selector: 'app-children-step',
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css']
})
export class ChildrenStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild("childContainer", { read: ViewContainerRef }) viewContainer;
  @ViewChild(BirthInfoComponent) birthInfoComponent: BirthInfoComponent;
  @ViewChild(CitizenshipSelectComponent) citizenshipSelectComponent: CitizenshipSelectComponent;
  @ViewChild(SpecHealthComponent) specHealthComponent: SpecHealthComponent;
  private inquiry: CompilationOfWizardSteps;
  components: Array<ComponentRef<ChildComponent>> = [];
  inquiryType: string;

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private resolver: ComponentFactoryResolver, private storageService: WizardStorageService,
    private cd: ChangeDetectorRef, private citizenshipService: CitizenshipService, private commonService: CommonService,
    private fb: FormBuilder, private formService: FormService) { }

  isValid(): boolean {
    let isValid = {
      children: (): boolean => {
        let result = true;
        for (let index = 0, len = this.components.length; index < len; index++) {
          const component = this.components[index];
          if (!component.instance.fullnameComponent
            || !component.instance.fullnameComponent.fullnameForm
            || !component.instance.fullnameComponent.fullnameForm.valid) {
            result = false;
            break;
          }
          if (!component.instance.identityCardComponent
            || !component.instance.identityCardComponent.identityCardForm
            || !component.instance.identityCardComponent.identityCardForm.valid) {
            result = false;
            break;
          }
        }
        return result;
      },
      birthInfo: (): boolean => {
        return this.birthInfoComponent && this.birthInfoComponent.birthInfoForm && this.birthInfoComponent.birthInfoForm.valid || false;
      },
      citizenships: (): boolean => {
        return this.citizenshipSelectComponent && this.citizenshipSelectComponent.citizenships.length > 0 || false;
      },
      specHealthDocument: () => {
        const specHealthsDocumentsValid = (): boolean => {
          return this.specHealthComponent
            && this.specHealthComponent.documentComponents
            && this.specHealthComponent.documentComponents.length == this.components.length
            && isNullOrUndefined(this.specHealthComponent.documentComponents.find(x => !x.confirmationDocumentForm.valid));
        }
        if (this.specHealthComponent && this.specHealthComponent.specHealth == 101 || false) {
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
      this.components.forEach(x => x.instance.show = false);
    }
    let select = (component: ComponentRef<ChildComponent>) => {
      hideChildren();
      component.instance.show = true;
    }
    let add = () => {
      hideChildren()
      const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
      let componentRef = this.viewContainer.createComponent(factory);
      componentRef.instance.show = true;
      this.components.push(componentRef);
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
  })();
  goTo = (() => {
    let getPerson = (component: ComponentRef<ChildComponent>): Person => {
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
    return {
      back: () => {
        this.router.navigate(["/"]);
      },
      next: () => {
        if (!this.isValid()) return;
        let children: Array<Child> = [];
        this.components.forEach((x, i) => {
          const specHealthDocument = this.specHealthComponent.specHealth == 101
            ? null
            : (() => {
              const form = this.specHealthComponent.documentComponents["_results"][i].confirmationDocumentForm;
              return new ConfirmationDocument(form.value["name"], form.value["series"], form.value["number"],
                form.value["dateIssue"], form.value["dateExpired"])
            })();
          const person = getPerson(x);
          const identityCard = new IdentityCard(x.instance.identityCardComponent.identityCardForm);
          let child = new Child(person.lastname, person.firstname, person.middlename, person.snils, person.noMiddlename, person.birthDate, person.birthPlace,
            person.gender, this.citizenshipSelectComponent.citizenships, this.specHealthComponent.specHealth,
            specHealthDocument,
            identityCard);
          children.push(child);
        });

        this.storageService.set(this.inquiryType, { children: children })
        this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.activatedRoute });
      }
    }
  })();


  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });
    this.inquiry = this.storageService.get(this.inquiryType);
  }

  ngAfterViewInit() {

    if (this.inquiry.children.length == 0) return;
    this.birthInfoComponent.birthInfoForm.patchValue({
      birthDate: this.inquiry.children[0].birthDate,
      birthPlace: this.inquiry.children[0].birthPlace
    });
    this.specHealthComponent.specHealth = this.inquiry.children[0].specHealth;
    this.citizenshipSelectComponent.citizenships = this.inquiry.children[0].citizenships;
    this.inquiry.children.forEach((child, index) => {
      const factory: ComponentFactory<ChildComponent> = this.resolver.resolveComponentFactory(ChildComponent);
      let componentRef = <ComponentRef<ChildComponent>>this.viewContainer.createComponent(factory);
      componentRef.instance.snilsComponent.snils = child.snils;
      componentRef.instance.genderComponent.gender = child.gender
      this.formService.patchFullnameForm(componentRef.instance.fullnameComponent.fullnameForm, child);
      this.formService.patchIdentityCardForm(componentRef.instance.identityCardComponent.identityCardForm, child.identityCard);
      (function setActiveChild() {
        if (index + 1 == this.inquiry.children.length)
          componentRef.instance.show = true;
      })();

      this.components.push(componentRef);
    });

    this.cd.detectChanges();
  }
}
