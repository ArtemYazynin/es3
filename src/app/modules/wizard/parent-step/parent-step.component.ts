import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApplicantType, ButtonsTitles, ConfigsOfRoutingButtons, InquiryRequest, inquiryType } from '../../../shared';
import { ActionsButtonsService } from '../../../shared/actions-buttons.service';
import { RelationTypeComponent } from '../../../shared/components/relation-type/relation-type.component';
import { PersonType } from '../../../shared/person-type.enum';
import { EditCitizenshipsComponent } from '../../inquiry/shared/components/edit-citizenships/edit-citizenships.component';
import { EditPersonComponent } from '../../inquiry/shared/components/edit-person/edit-person.component';
import { StepBase, WizardStorageService } from '../shared';

@Component({
  providers: [ActionsButtonsService],
  selector: 'app-parent-step',
  templateUrl: './parent-step.component.html',
  styleUrls: ['./parent-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ParentStepComponent implements OnInit, AfterViewInit, StepBase {
  @ViewChild(EditPersonComponent) editPersonComponent: EditPersonComponent;
  @ViewChild(EditCitizenshipsComponent) editCitizenshipsComponent: EditCitizenshipsComponent;
  @ViewChild(RelationTypeComponent) relationTypeComponent: RelationTypeComponent;
  inquiry: InquiryRequest;
  agree: boolean = false;

  personTypes = PersonType;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;
  inquiryTypes = inquiryType;
  applicantTypes = ApplicantType;
  config: ConfigsOfRoutingButtons;

  constructor(private storageService: WizardStorageService, private cdr: ChangeDetectorRef,
    private route: ActivatedRoute, private actionsButtonsService: ActionsButtonsService) { }

  ngOnInit() {
    this.inquiry = <InquiryRequest>this.storageService.get(this.inquiryType);
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      this.actionsButtonsService.primaryActionParentStep(this.editCitizenshipsComponent, this.editPersonComponent, this.relationTypeComponent, this.inquiry),
      this.actionsButtonsService.inverseActionParentStep(this.inquiry.applicantType)
    );
    if (this.inquiry.parent) this.agree = true;
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  isValid() {
    const citizenshipsIsValid = this.editCitizenshipsComponent.isValid();
    const personIsValid = this.editPersonComponent.isValid();
    const relationTypeIsValid = this.relationTypeComponent.isValid()
    return citizenshipsIsValid
      && personIsValid
      && relationTypeIsValid
      && this.agree;
  }
}
