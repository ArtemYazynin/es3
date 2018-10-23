import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService } from '../../../shared';
import { StepBase, WizardStorageService } from '../shared';
import { EditChildrenComponent } from './../../inquiry/shared/components/edit-children/edit-children.component';


@Component({
  selector: 'app-children-step',
  templateUrl: './children-step.component.html',
  styleUrls: ['./children-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChildrenStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditChildrenComponent) editChildrenComponent: EditChildrenComponent;

  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  configs: ConfigsOfRoutingButtons;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
    this.configs = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        this.inquiryService.saveChildren(this.editChildrenComponent, (patch) => {
          this.storageService.set(this.inquiryType, patch);
        })

        //this.storageService.set(this.inquiryType, { children: children })
        this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
      },
      () => {
        this.router.navigate(["/"]);
      }
    );
  }

  ngAfterViewInit() {
    if (!this.inquiry || !this.inquiry.children || this.inquiry.children.length == 0) {
      this.editChildrenComponent.navBarManager.add();
    }
  }
}
