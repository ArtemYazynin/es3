import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationDocumentDialogComponent } from './edit-confirmation-document-dialog.component';

describe('EditConfirmationDocumentDialogComponent', () => {
  let component: EditConfirmationDocumentDialogComponent;
  let fixture: ComponentFixture<EditConfirmationDocumentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmationDocumentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmationDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
