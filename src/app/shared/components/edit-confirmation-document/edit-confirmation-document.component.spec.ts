import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfirmationDocumentComponent } from './edit-confirmation-document.component';

describe('EditConfirmationDocumentComponent', () => {
  let component: EditConfirmationDocumentComponent;
  let fixture: ComponentFixture<EditConfirmationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditConfirmationDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditConfirmationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
