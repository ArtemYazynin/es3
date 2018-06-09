import { Component, OnInit } from '@angular/core';
import {
  ApplicantType, FormService
} from "../../shared/index";
import { WizardStorageService } from '../../shared/wizard-storage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-applicant-type-step',
  templateUrl: './applicant-type-step.component.html',
  styleUrls: ['./applicant-type-step.component.css']
})
export class ApplicantTypeStepComponent implements OnInit {
  applicantType: ApplicantType = ApplicantType["Родитель/Опекун"];

  applicantTypes = (() => {
    let result: Array<any> = [];
    let groupOfId = ApplicantType.values();
    groupOfId.forEach(key => {
      result.push({
        id: parseInt(key),
        name: ApplicantType[key]
      });
    });
    return result;
  })();

  constructor(private storageService: WizardStorageService, 
              private router: Router,
              private activatedRoute: ActivatedRoute,) { }

  ngOnInit() {
  }
  public goToParentStep(){
    this.storageService.applicantType = this.applicantType;
    this.router.navigate(["../parentStep"],{ relativeTo: this.activatedRoute });
  }
}
