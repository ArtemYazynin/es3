import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreschoolInstitutionStepComponent } from './preschool-institution-step.component';

describe('PreschoolInstitutionStepComponent', () => {
  let component: PreschoolInstitutionStepComponent;
  let fixture: ComponentFixture<PreschoolInstitutionStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreschoolInstitutionStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreschoolInstitutionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
