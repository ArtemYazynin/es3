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
  form: FormGroup;
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
      this.form.patchValue({
        name: this.model.name,
        series: this.model.series,
        number: this.model.number,
        dateIssue: this.model.dateIssue,
        dateExpired: this.model.dateExpired,
      });
    }
  }

  getResult() {
    return ConfirmationDocument.construct(this.form, this.model ? this.model.id : undefined);
  }

  private buildForm(): any {
    this.form = this.fb.group({
      "name": ["", [Validators.required, Validators.maxLength(250)]],
      "series": ["", [Validators.maxLength(250)]],
      "number": ["", [Validators.required, Validators.maxLength(250)]],
      "dateIssue": ["", [Validators.required]],
      "dateExpired": ["", []]
    });
    this.form.valueChanges
      .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }
  private onValueChange(data?: any) {
    this.formService.onValueChange(this.form, this.formErrors, this.validationMessages);
  }
  isValid() {
    return this.form && this.form.valid;
  }
}
