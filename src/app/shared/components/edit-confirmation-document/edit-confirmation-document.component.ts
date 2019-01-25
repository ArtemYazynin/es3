import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentType, ConfirmationDocument, FormService, Theme } from '../../index';

@Component({
  selector: 'app-edit-confirmation-document',
  templateUrl: './edit-confirmation-document.component.html',
  styleUrls: ['./edit-confirmation-document.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditConfirmationDocumentComponent implements OnInit {
  currentDate = new Date();
  confirmationDocumentForm: FormGroup;
  formErrors = ConfirmationDocument.formErrorsTemplate;
  validationMessages = ConfirmationDocument.validationMessages;
  themes = Theme;

  @Input() title: string = "";
  @Input() model: ConfirmationDocument;
  @Input() type: AttachmentType;

  constructor(private fb: FormBuilder, private formService: FormService) { }

  ngOnInit() {
    this.buildForm();
    if (this.model) {
      this.confirmationDocumentForm.patchValue({
        name: this.model.name,
        series: this.model.series,
        number: this.model.number,
        dateIssue: this.model.dateIssue,
        dateExpired: this.model.dateExpired,
      });
    }
  }

  getResult() {
    return ConfirmationDocument.construct(this.confirmationDocumentForm, this.model ? this.model.id : undefined);
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
  isValid() {
    return this.confirmationDocumentForm && this.confirmationDocumentForm.valid;
  }
}
