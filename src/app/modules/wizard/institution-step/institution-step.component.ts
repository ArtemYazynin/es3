import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, inquiryType } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { EditInstitutionsComponent } from '../../inquiry/shared/components/edit-institutions/edit-institutions.component';

@Component({
  selector: 'app-institution-step',
  templateUrl: './institution-step.component.html',
  styleUrls: ['./institution-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstitutionStepComponent implements OnInit, AfterViewInit {
  @ViewChild(EditInstitutionsComponent) editInstitutionsComponent: EditInstitutionsComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;
  inquiryTypes = inquiryType;

  constructor(private router: Router, private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back, undefined, undefined);
  }

  ngAfterViewInit() {
    this.config.primaryAction = this.actionsButtonsService.primaryActionInsitutionStep(this.editInstitutionsComponent, this.inquiry, this.inquiry.type, this.router, this.route);
    this.config.inverseAction = this.actionsButtonsService.inverseActionInsitutionStep(this.inquiry, this.router, this.route);

    this.cdr.markForCheck();
  }

  isValid() {
    return this.editInstitutionsComponent && this.editInstitutionsComponent.isValid();
  }
}
