import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService, Theme } from '../../../shared';
import { Guid } from '../../../shared/models/guid';
import { EditCurrentEducationPlaceComponent } from '../../inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { CurrentEducationPlace, WizardStorageService } from '../shared';

@Component({
  selector: 'app-curren-education-place-step',
  templateUrl: './current-education-place-step.component.html',
  styleUrls: ['./current-education-place-step.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrentEducationPlaceStepComponent implements OnInit {
  @ViewChild(EditCurrentEducationPlaceComponent) editCurrentEducationPlaceComponent: EditCurrentEducationPlaceComponent;
  inquiry: Inquiry = this.route.snapshot.data.resolved.inquiry;
  config: ConfigsOfRoutingButtons;
  themes = Theme;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.config = new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const currentEducationPlace = CurrentEducationPlace.buildByForm(this.editCurrentEducationPlaceComponent.currentPlaceForm,
          this.editCurrentEducationPlaceComponent.groups);
        this.initId(currentEducationPlace);
        this.storageService.set(this.inquiry.type, { currentEducationPlace: currentEducationPlace });

        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      },
      () => {
        this.router.navigate(["../childrenStep"], { relativeTo: this.route });
      }
    );
  }

  //only dev mode
  private initId(currentEducationPlace: CurrentEducationPlace) {
    const hasData = this.editCurrentEducationPlaceComponent.currentEducationPlace && this.editCurrentEducationPlaceComponent.currentEducationPlace.id;
    if (!environment.production && !hasData) {
      currentEducationPlace.id = Guid.newGuid();
    }
  }

  isValid() {
    return this.editCurrentEducationPlaceComponent.currentPlaceForm && this.editCurrentEducationPlaceComponent.currentPlaceForm.valid || false;
  }
}
