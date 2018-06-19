import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicantStepComponent } from './applicant-step.component';

describe('ApplicantStepComponent', () => {
  let component: ApplicantStepComponent;
  let fixture: ComponentFixture<ApplicantStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplicantStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
