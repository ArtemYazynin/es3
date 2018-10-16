import { Component, Input, OnInit, QueryList, ViewChildren, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import { ConfirmationDocumentComponent } from '../confirmation-document/confirmation-document.component';
import { Observable } from 'rxjs';
import { AttachmentType, SpecHealth, SpecHealthService } from '../../index';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-spec-health',
  templateUrl: './spec-health.component.html',
  styleUrls: ['./spec-health.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpecHealthComponent implements OnInit, AfterViewInit {
  @ViewChildren(ConfirmationDocumentComponent) documentComponents: QueryList<ConfirmationDocumentComponent>;
  @Input() childrenComponents: Array<ChildComponent>;

  attachmentType = AttachmentType;
  hasDocuments: boolean = false;
  specHealth: number;
  specHealths: Observable<Array<SpecHealth>> = this.specHealthService.get();
  constructor(private specHealthService: SpecHealthService) { }

  ngOnInit() {
    this.specHealth = this.childrenComponents && this.childrenComponents.length > 0
      ? this.childrenComponents[0]["instance"].child.specHealth
      : 101;
  }

  ngAfterViewInit(): void {

  }
}
