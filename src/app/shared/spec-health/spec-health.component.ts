import { Component, OnInit, ViewChild } from '@angular/core';
import { SpecHealthService, ConfirmationDocument, SpecHealth } from '../index';
import { ConfirmationDocumentComponent } from '../../confirmation-document/confirmation-document.component';

@Component({
  selector: 'app-spec-health',
  templateUrl: './spec-health.component.html',
  styleUrls: ['./spec-health.component.css']
})
export class SpecHealthComponent implements OnInit {
  @ViewChild(ConfirmationDocumentComponent) confirmationDocumentComponent:ConfirmationDocumentComponent;
  isAvailable = {
    specHealthDocument: () => {
      return this.specHealth != 101;
    }
  }
  specHealth:number = 101;
  specHealths: Array<SpecHealth> = [];
  constructor(private specHealthService: SpecHealthService,) { }

  ngOnInit() {
    this.specHealthService.get().subscribe(result => { this.specHealths = result; });
  }

}
