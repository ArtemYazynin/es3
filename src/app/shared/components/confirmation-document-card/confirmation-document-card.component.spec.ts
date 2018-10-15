import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDocumentCardComponent } from './confirmation-document-card.component';

describe('ConfirmationDocumentCardComponent', () => {
  let component: ConfirmationDocumentCardComponent;
  let fixture: ComponentFixture<ConfirmationDocumentCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDocumentCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDocumentCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
