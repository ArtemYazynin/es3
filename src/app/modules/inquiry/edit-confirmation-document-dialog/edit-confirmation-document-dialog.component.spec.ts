import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { ConfirmationDocument } from '../../../shared';
import { DialogButtonsComponent } from '../dialog-buttons/dialog-buttons.component';
import { InquiryModule } from '../inquiry.module';
import { EditConfirmationDocumentDialogComponent } from './edit-confirmation-document-dialog.component';

describe('EditConfirmationDocumentDialogComponent', () => {
  let component: EditConfirmationDocumentDialogComponent;
  let fixture: ComponentFixture<EditConfirmationDocumentDialogComponent>;
  const mockDialogRef = { close: jasmine.createSpy('close') };

  const defaultMatDialogData = {
    $document: new BehaviorSubject<ConfirmationDocument>(
      new ConfirmationDocument("doc", "1234", "123456", new Date(), new Date())
    )
  };

  let prepare = (matDialogData: { $document: BehaviorSubject<ConfirmationDocument> }) => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, InquiryModule, HttpClientTestingModule],
      declarations: [],
      providers: [
        MatDialog,
        {
          provide: MatDialogRef,
          useValue: mockDialogRef
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: matDialogData
        }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(EditConfirmationDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  it('should create', () => {
    prepare(defaultMatDialogData);
    expect(component).toBeTruthy();
    expect(component.config).toBeTruthy();
    expect(component.config.primaryTitle).toEqual(DialogButtonsComponent.defaultSave);
    expect(component.config.inverseTitle).toEqual(DialogButtonsComponent.defaultInverse);
  });

  it('editCitizenshipsComponent.model. Should have model', () => {
    prepare(defaultMatDialogData);
    expect(component.confirmationProofDocumentComponent.model).toEqual(defaultMatDialogData.$document.getValue());
  });

  it("config.inverseAction. Should call close dialog", () => {
    prepare(defaultMatDialogData);
    component.config.inverseAction();
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("config.primaryAction. Should call: close dialog, next with default parameter.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.data.$document, "next").and.callThrough();
    spyOn(ConfirmationDocument, "construct").and.callThrough();
    component.config.primaryAction();

    expect(ConfirmationDocument.construct).toHaveBeenCalled();
    expect(component.data.$document.next).toHaveBeenCalledWith(defaultMatDialogData.$document.getValue());
    expect(mockDialogRef.close).toHaveBeenCalled();
  });

  it("isValid. Should return true and call editContactInfoComponent.isValid.", () => {
    prepare(defaultMatDialogData);
    spyOn(component.confirmationProofDocumentComponent, "isValid").and.callThrough();
    component.confirmationProofDocumentComponent.form.markAsDirty();
    const isValid = component.isValid();

    expect(isValid).toBe(true);
    expect(component.confirmationProofDocumentComponent.isValid).toHaveBeenCalled();
  });

  it("isValid. Should return false and call editContactInfoComponent.isValid.", () => {
    prepare(defaultMatDialogData);
    expect(component.isValid()).toBe(false);
  });
});
