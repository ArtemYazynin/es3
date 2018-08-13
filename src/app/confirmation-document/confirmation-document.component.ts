import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentType, ConfirmationDocument } from '../shared';
import { FormService } from '../shared/form.service';

@Component({
  selector: 'app-confirmation-document',
  templateUrl: './confirmation-document.component.html',
  styleUrls: ['./confirmation-document.component.css']
})
export class ConfirmationDocumentComponent implements OnInit {
  currentDate = new Date();
  confirmationDocumentForm: FormGroup;
  formErrors = ConfirmationDocument.formErrorsTemplate;
  validationMessages = ConfirmationDocument.validationMessages;

  @Input() title: string = "";
  @Input() type: AttachmentType;

  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): any {
    this.confirmationDocumentForm = this.fb.group({
      "name": ["", [Validators.required, Validators.maxLength(250)]],
      "series": ["", [Validators.maxLength(250)]],
      "number": ["", [Validators.required, Validators.maxLength(250)]],
      "dateIssue": ["", [Validators.required]],
      "dateExpired": ["", []]
    });
    this.confirmationDocumentForm.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }
  private onValueChange(data?: any) {
    this.formService.onValueChange(this.confirmationDocumentForm, this.formErrors, this.validationMessages);
  }

}
