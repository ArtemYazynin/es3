import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryInfoStepComponent } from './inquiry-info-step.component';

describe('InquiryInfoStepComponent', () => {
  let component: InquiryInfoStepComponent;
  let fixture: ComponentFixture<InquiryInfoStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InquiryInfoStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InquiryInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
