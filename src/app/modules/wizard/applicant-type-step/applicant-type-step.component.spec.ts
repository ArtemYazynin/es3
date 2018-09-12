import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantTypeStepComponent } from './applicant-type-step.component';

describe('ApplicantTypeStepComponent', () => {
  let component: ApplicantTypeStepComponent;
  let fixture: ComponentFixture<ApplicantTypeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantTypeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantTypeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
