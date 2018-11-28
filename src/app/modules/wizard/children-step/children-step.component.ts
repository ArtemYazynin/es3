import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ComponentFactory, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { WizardStorageService } from '../shared';
import { EditChildrenComponent } from './../../inquiry/shared/components/edit-children/edit-children.component';


@Component({
  selector: 'app-children-step',
  providers: [ActionsButtonsService],
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenStepComponent implements OnInit {
  @ViewChild("children", { read: ViewContainerRef }) viewContainer;
  component: EditChildrenComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;
  constructor(private resolver: ComponentFactoryResolver, private activatedRoute: ActivatedRoute, private storageService: WizardStorageService, private actionsButtonsService: ActionsButtonsService,
    private cdr: ChangeDetectorRef, private route: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(x => {
      if (!x) return;
      this.initChildren();
      this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
        this.actionsButtonsService.primaryActionChildrenStep(this.component, this.inquiry.type),
        this.actionsButtonsService.inverseActionChildrenStep()
      );
      this.cdr.markForCheck();
    });
  }

  private initChildren() {
    this.initChildrenComponent();
    this.createEmptyChild();
  }

  private createEmptyChild() {
    if (!this.inquiry.children || this.inquiry.children.length == 0) {
      this.component.navBarManager.add();
    }
  }

  private initChildrenComponent() {
    (this.viewContainer as ViewContainerRef).clear();
    const factory: ComponentFactory<EditChildrenComponent> = this.resolver.resolveComponentFactory(EditChildrenComponent);
    let componentRef = <ComponentRef<EditChildrenComponent>>this.viewContainer.createComponent(factory);
    componentRef.instance.owner = this.inquiry.applicant ? this.inquiry.applicant : this.inquiry.parent;
    componentRef.instance.children = this.inquiry.children;
    componentRef.instance.inquiryType = this.inquiry.type;
    componentRef.instance.specHealth = this.inquiry.specHealth; 
    this.component = componentRef.instance;
  }
}
