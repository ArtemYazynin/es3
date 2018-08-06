import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApplicantType, RelationType, RelationTypeService, WizardStorageService } from '../shared';

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css']
})
export class RelationTypeComponent implements OnInit, OnDestroy {
  private inquiryType: string;
  private subscription: Subscription;
  relationTypes: Array<RelationType> = [];
  relationType: RelationType;
  isAvailable: boolean = false;
  ngOnInit() {
    this.activatedRoute.params.forEach((params: Params) => {
      if (params["type"]) {
        this.inquiryType = params["type"];
      }
    });
    this.isAvailable = this.storageService.get(this.inquiryType).applicantType !== ApplicantType["Ребенок-заявитель"];

    if (!this.isAvailable) return;

    this.subscription = this.relationTypeService.get().subscribe(result => {
      this.relationTypes = result;
      if (this.relationType) this.relationType = this.relationTypes.find(x => x.id == this.relationType.id);
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  constructor(private relationTypeService: RelationTypeService, private storageService: WizardStorageService, private activatedRoute: ActivatedRoute) { }
}
