import { Component, OnInit, OnDestroy } from '@angular/core';
import { StepBase, CommonService, WizardStorageService, CompilationOfWizardSteps, DrawService, CitizenshipService, Country } from '../../shared/index';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { isNullOrUndefined } from 'util';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-preview-step',
  templateUrl: './preview-step.component.html',
  styleUrls: ['./preview-step.component.css']
})
export class PreviewStepComponent implements OnInit, StepBase {

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private citizenshipService: CitizenshipService,
    private storageService: WizardStorageService, private drawService: DrawService) { }

  inquiryType: string;
  parentWidgetSettings: object;
  compilationSteps: CompilationOfWizardSteps;
  goTo = {
    back: () => {
      this.router.navigate(["../fileAttachmentStep"], { relativeTo: this.activatedRoute });
    },
    next: () => {

    }
  };
  drawManager = this.drawService
  isValid(): boolean {
    return true;
  }

  ngOnInit() {

    this.activatedRoute.params.forEach((params: Params) => { if (params["type"]) this.inquiryType = params["type"]; });
    this.compilationSteps = this.storageService.get(this.inquiryType);
    this.parentWidgetSettings = (() => {
      return isNullOrUndefined(this.compilationSteps.applicant)
        ? { "col-md-12": true }
        : { "col-md-6": true };
    })();
  }

}
