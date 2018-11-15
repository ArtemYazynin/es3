import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolInquiryInfoDialogComponent } from './preschool-inquiry-info-dialog.component';

describe('PreschoolInquiryInfoDialogComponent', () => {
  let component: PreschoolInquiryInfoDialogComponent;
  let fixture: ComponentFixture<PreschoolInquiryInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreschoolInquiryInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolInquiryInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
