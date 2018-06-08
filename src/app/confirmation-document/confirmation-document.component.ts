import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmationDocument } from '../shared/index';

@Component({
  selector: 'app-confirmation-document',
  templateUrl: './confirmation-document.component.html',
  styleUrls: ['./confirmation-document.component.css']
})
export class ConfirmationDocumentComponent implements OnInit {
  confirmationDocumentForm: FormGroup;
  confirmationDocument: ConfirmationDocument = new ConfirmationDocument();
  formErrors = ConfirmationDocument.formErrorsTemplate;
  validationMessages = ConfirmationDocument.validationMessages;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm(): any {
    this.confirmationDocumentForm = this.fb.group({
      "name":[
        this.confirmationDocument.name,
        [
          Validators.required, Validators.maxLength(250)
        ]
      ],
      "number":[
        this.confirmationDocument.name,
        [
          Validators.required, Validators.maxLength(250)
        ]
      ],
      "dateIssue": [
        this.confirmationDocument.dateIssue,
        [
          Validators.required
        ]
      ],
      "dateExpired": [
        this.confirmationDocument.dateExpired, []
      ]
    });
    this.confirmationDocumentForm.valueChanges
            .subscribe(data => this.onValueChange(data));

    this.onValueChange();
  }
  private onValueChange(data?: any) {
    if (!this.confirmationDocumentForm) return;
    let form = this.confirmationDocumentForm;
    
    for (let field in this.formErrors) {
        this.formErrors[field] = "";
        // form.get - получение элемента управления
        let control = form.get(field);

        if (control && control.dirty && !control.valid) {
            let message = this.validationMessages[field];
            for (let key in control.errors) {
                this.formErrors[field] += message[key] + " ";
            }
        }
    }
  }

}
