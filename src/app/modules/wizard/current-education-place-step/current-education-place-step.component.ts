import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditCurrentEducationPlaceComponent } from '../../inquiry/shared/components/edit-current-education-place/edit-current-education-place.component';
import { CurrentEducationPlace, StepBase, WizardStorageService } from '../shared';
import { Inquiry } from '../../../shared';

@Component({
  selector: 'app-curren-education-place-step',
  templateUrl: './current-education-place-step.component.html',
  styleUrls: ['./current-education-place-step.component.css']
})
export class CurrentEducationPlaceStepComponent implements OnInit, StepBase {
  @ViewChild(EditCurrentEducationPlaceComponent) editCurrentEducationPlaceComponent: EditCurrentEducationPlaceComponent;
  inquiry: Inquiry;
  inquiryType = this.route.snapshot.data.resolved.inquiryType;

  constructor(private route: ActivatedRoute, private router: Router, private storageService: WizardStorageService) { }

  isValid() {
    return this.editCurrentEducationPlaceComponent.isValid();
  }


  ngOnInit() {
    this.inquiry = <Inquiry>this.storageService.get(this.inquiryType);
  }



  onSubmit() {

  }


  goTo = (() => {
    return {
      back: () => {
        this.router.navigate(["../childrenStep"], { relativeTo: this.route });
      },
      next: () => {
        const place = new CurrentEducationPlace(this.editCurrentEducationPlaceComponent.currentPlaceForm.value["municipality"],
          this.editCurrentEducationPlaceComponent.currentPlaceForm.value["institutionType"], this.editCurrentEducationPlaceComponent.currentPlaceForm.value["institution"],
          this.editCurrentEducationPlaceComponent.currentPlaceForm.value["isOther"], this.editCurrentEducationPlaceComponent.currentPlaceForm.value["other"],
          this.editCurrentEducationPlaceComponent.currentPlaceForm.value["group"]);
        this.storageService.set(this.inquiryType, { currentEducationPlace: place });
        this.router.navigate(["../applicantTypeStep"], { relativeTo: this.route });
      }
    }
  })();
}
