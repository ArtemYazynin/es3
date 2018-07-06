import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEducationPlaceStepComponent } from './current-education-place-step.component';

describe('CurrenEducationPlaceStepComponent', () => {
  let component: CurrentEducationPlaceStepComponent;
  let fixture: ComponentFixture<CurrentEducationPlaceStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentEducationPlaceStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEducationPlaceStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
