import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInquiryInfoDialogComponent } from './edit-inquiry-info-dialog.component';

describe('EditInquiryInfoDialogComponent', () => {
  let component: EditInquiryInfoDialogComponent;
  let fixture: ComponentFixture<EditInquiryInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInquiryInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInquiryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
