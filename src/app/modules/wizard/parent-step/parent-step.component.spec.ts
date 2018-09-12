import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentStepComponent } from './parent-step.component';

describe('ParentStepComponent', () => {
  let component: ParentStepComponent;
  let fixture: ComponentFixture<ParentStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
