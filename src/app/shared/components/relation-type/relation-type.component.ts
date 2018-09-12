import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApplicantType, RelationType, RelationTypeService } from '../../index';
import { WizardStorageService } from '../../../modules/wizard/shared';

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css']
})
export class RelationTypeComponent implements OnInit, OnDestroy {
  @Input() inquiryType: string;

  private subscription: Subscription;
  relationTypes: Array<RelationType> = [];
  relationType: RelationType;
  isAvailable: boolean = false;
  ngOnInit() {
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
  constructor(private relationTypeService: RelationTypeService, private storageService: WizardStorageService) { }
}