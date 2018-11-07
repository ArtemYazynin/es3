import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Parent, RelationType, RelationTypeService } from '../../index';
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

  constructor(private relationTypeService: RelationTypeService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    if (!this.owner) this.owner = new Parent(undefined, undefined, undefined, undefined, false, undefined, undefined, undefined);
    this.subscription = this.relationTypeService.get().subscribe(result => {
      this.relationTypes = result;
      if (this.owner.relationType) {
        this.owner.relationType = this.relationTypes.find(x => x.id == this.owner.relationType.id);
        this.cdr.detectChanges();
      }
    });
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isValid() {
    if (!this.owner.relationType) return false;
    if (!this.owner.relationType.confirmationDocument) return true
    return this.editConfirmationDocumentComponent && this.editConfirmationDocumentComponent.confirmationDocumentForm.valid;
  }
}
