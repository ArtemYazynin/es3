import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonsTitles, ConfigsOfRoutingButtons, Inquiry, InquiryService, Theme } from '../../../shared';
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
  private url = (() => {
    const prev = "../";
    return {
      back: `${prev}childrenStep`,
      next: `${prev}applicantTypeStep`
    }
  })();

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.config = this.getConfig();
  }

  private getConfig() {
    return new ConfigsOfRoutingButtons(ButtonsTitles.Next, ButtonsTitles.Back,
      () => {
        const currentEducationPlace = CurrentEducationPlace.buildByForm(this.editCurrentEducationPlaceComponent.currentPlaceForm, this.editCurrentEducationPlaceComponent.groups);
        this.storageService.set(this.inquiry.type, { currentEducationPlace: currentEducationPlace });
        this.router.navigate([this.url.next], { relativeTo: this.route });
      },
      () => {
        this.router.navigate([this.url.back], { relativeTo: this.route });
      }
    );
  }

  isValid() {
    return this.editCurrentEducationPlaceComponent.currentPlaceForm && this.editCurrentEducationPlaceComponent.currentPlaceForm.valid || false;
  }
}
