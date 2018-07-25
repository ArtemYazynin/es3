import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ApplicantType, RelationType, RelationTypeService, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css']
})
export class RelationTypeComponent implements OnInit {
  private inquiryType: string;
  relationTypes: Array<RelationType> = [];
  relationType: RelationType;
  isAvailable: boolean = false;
  constructor(private relationTypeService: RelationTypeService, private storageService: WizardStorageService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });
    this.isAvailable = this.storageService.get(this.inquiryType).applicantType !== ApplicantType["Ребенок-заявитель"];

    if (!this.isAvailable) return; 

    this.relationTypeService.get().subscribe(result => {
      this.relationTypes = result;
      this.relationType = this.relationTypes[0];
    });
  }
}
