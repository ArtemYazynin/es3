import { Component, OnInit } from '@angular/core';
import { RelationType, RelationTypeService, ApplicantType, WizardStorageService } from '../shared/index';

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css']
})
export class RelationTypeComponent implements OnInit {
  relationTypes: Array<RelationType> = [];
  relationType: RelationType;
  isAvailable: boolean = false;
  constructor(private relationTypeService: RelationTypeService, private storageService: WizardStorageService) { }

  ngOnInit() {
    this.isAvailable = this.storageService.request.applicantType !== ApplicantType["Ребенок-заявитель"];
    if (!this.isAvailable) return;

    this.relationTypeService.get().subscribe(result => { 
      this.relationTypes = result;
      this.relationType = this.relationTypes[0]; 
    });
  }
}
