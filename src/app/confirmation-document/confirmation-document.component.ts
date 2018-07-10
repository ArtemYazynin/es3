import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDocument } from '../shared/index';
import { FormService } from '../shared/form.service';
import { WizardStorageService } from '../wizard/shared/wizard-storage.service';

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

  @Input()
  title: string = "";
  constructor(private fb: FormBuilder,
    private formService: FormService,
    private storageService: WizardStorageService) { }

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
