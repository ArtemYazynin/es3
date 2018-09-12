import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolInquiryInfoStepComponent } from './school-inquiry-info-step.component';

describe('SchoolInquiryInfoStepComponent', () => {
  let component: SchoolInquiryInfoStepComponent;
  let fixture: ComponentFixture<SchoolInquiryInfoStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolInquiryInfoStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolInquiryInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
