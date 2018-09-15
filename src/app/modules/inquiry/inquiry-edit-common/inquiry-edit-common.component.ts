import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Inquiry, InquiryService, ConfirmationDocument } from '../../../shared';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-inquiry-edit-common',
  templateUrl: './inquiry-edit-common.component.html',
  styleUrls: ['./inquiry-edit-common.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InquiryEditCommonComponent implements OnInit {
  inquiry: Observable<Inquiry>;
  form: FormGroup;
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private inquiryService: InquiryService) { }

  ngOnInit() {
    this.inquiry = this.inquiryService.get(this.route.snapshot.data.resolved.inquiryId);
  }

  getDocumentView(document) {
    return ConfirmationDocument.toString(document);
  }
}
