import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolInquiryInfoStepComponent } from './preschool-inquiry-info-step.component';

describe('PreschoolInquiryInfoStepComponent', () => {
  let component: PreschoolInquiryInfoStepComponent;
  let fixture: ComponentFixture<PreschoolInquiryInfoStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreschoolInquiryInfoStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolInquiryInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
