import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenEducationPlaceStepComponent } from './curren-education-place-step.component';

describe('CurrenEducationPlaceStepComponent', () => {
  let component: CurrenEducationPlaceStepComponent;
  let fixture: ComponentFixture<CurrenEducationPlaceStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrenEducationPlaceStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrenEducationPlaceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
