import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationDocumentComponent } from './confirmation-document.component';

describe('ConfirmationDocumentComponent', () => {
  let component: ConfirmationDocumentComponent;
  let fixture: ComponentFixture<ConfirmationDocumentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmationDocumentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmationDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
