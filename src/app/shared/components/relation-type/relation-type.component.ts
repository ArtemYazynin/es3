import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Parent, RelationType, RelationTypeService, Theme } from '../../index';
import { AttachmentType } from '../../models/attachment-type.enum';
import { EditConfirmationDocumentComponent } from '../edit-confirmation-document/edit-confirmation-document.component';

@Component({
  selector: 'app-relation-type',
  templateUrl: './relation-type.component.html',
  styleUrls: ['./relation-type.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RelationTypeComponent implements OnInit, OnDestroy {
  @Input() owner: Parent;
  @ViewChild(EditConfirmationDocumentComponent) editConfirmationDocumentComponent: EditConfirmationDocumentComponent;
  private subscription: Subscription;
  relationTypes: Array<RelationType> = [];
  attachmentTypes = AttachmentType;
  themes = Theme;
  relationForm: FormGroup

  constructor(private relationTypeService: RelationTypeService, private cdr: ChangeDetectorRef, private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();

    if (!this.owner) this.owner = new Parent(undefined, undefined, undefined, undefined, false, undefined, undefined, undefined);
    this.subscription = this.relationTypeService.get().subscribe(result => {
      this.relationTypes = result;
      if (this.owner.relationType) {
        this.owner.relationType = this.relationTypes.find(x => x.id == this.owner.relationType.id);
        this.relationForm.patchValue({ relationType: this.owner.relationType });
        this.cdr.detectChanges();
      }
    });
  }

  private buildForm() {
    this.relationForm = this.fb.group({
      relationType: [
        "",
        []
      ]
    });
  }

  onChange(context: RelationTypeComponent) {
    this.owner.relationType = context.relationForm.controls.relationType.value;
  };

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValid() {
    if (!this.owner.relationType) return false;
    if (!this.owner.relationType.confirmationDocument) return true
    return this.editConfirmationDocumentComponent && this.editConfirmationDocumentComponent.confirmationDocumentForm.valid;
  }
}
