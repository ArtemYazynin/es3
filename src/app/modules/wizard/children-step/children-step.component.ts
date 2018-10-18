import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Inquiry, InquiryService } from '../../../shared';
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

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.inquiry = this.storageService.get(this.inquiryType);
  }

  ngAfterViewInit() {
    if (!this.inquiry || !this.inquiry.children || this.inquiry.children.length == 0) {
      this.editChildrenComponent.navBarManager.add();
    }
  }
  isValid(): boolean {
    return this.editChildrenComponent.isValid();
  }

  goTo = (() => {
    return {
      back: () => {
        this.router.navigate(["/"]);
      },
      next: () => {
        this.inquiryService.saveChildren(this.editChildrenComponent, (patch) => {
          this.storageService.set(this.inquiryType, patch);
        })

        //this.storageService.set(this.inquiryType, { children: children })
        this.router.navigate(["../currentEducationPlaceStep"], { relativeTo: this.route });
      }
    }
  })();
}
