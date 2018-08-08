import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { CitizenshipService, CompilationOfWizardSteps, DrawService, StepBase, WizardStorageService } from '../../shared';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css']
})
export class PreviewStepComponent implements OnInit, StepBase {

  constructor(private router: Router, private route: ActivatedRoute, private citizenshipService: CitizenshipService,
    private storageService: WizardStorageService, private drawService: DrawService) { }

  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  parentWidgetSettings: object;
  compilationSteps: CompilationOfWizardSteps;
  goTo = {
    back: () => {
      this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.route });
    },
    next: () => {

    }
  };
  drawManager = this.drawService
  isValid(): boolean {
    return true;
  }

  ngOnInit() {
    this.compilationSteps = this.storageService.get(this.inquiryType);
    this.parentWidgetSettings = (() => {
      return isNullOrUndefined(this.compilationSteps.applicant)
        ? { "col-md-12": true }
        : { "col-md-6": true };
    })();
  }

}
