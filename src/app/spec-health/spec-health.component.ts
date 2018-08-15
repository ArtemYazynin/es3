import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ConfirmationDocumentComponent } from '../confirmation-document/confirmation-document.component';
import { AttachmentType, SpecHealth, SpecHealthService } from '../shared';
import { ChildComponent } from '../wizard/children-step/child/child.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-spec-health',
  templateUrl: './spec-health.component.html',
  styleUrls: ['./spec-health.component.css']
})
export class SpecHealthComponent implements OnInit {

  @ViewChildren(ConfirmationDocumentComponent) documentComponents: QueryList<ConfirmationDocumentComponent>;
  @Input() childrenComponents: Array<ChildComponent>;

  attachmentType = AttachmentType;
  hasDocuments: boolean = false;
  specHealth: number = 101;
  specHealths: Observable<Array<SpecHealth>> = this.specHealthService.get();
  constructor(private specHealthService: SpecHealthService) { }

  ngOnInit() { 
  }
}
