import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDocumentViewComponent } from './confirmation-document-view.component';

describe('ConfirmationDocumentViewComponent', () => {
  let component: ConfirmationDocumentViewComponent;
  let fixture: ComponentFixture<ConfirmationDocumentViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDocumentViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDocumentViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
