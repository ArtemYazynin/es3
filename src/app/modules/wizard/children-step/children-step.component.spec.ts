import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildrenStepComponent } from './children-step.component';

describe('ChildrenStepComponent', () => {
  let component: ChildrenStepComponent;
  let fixture: ComponentFixture<ChildrenStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChildrenStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChildrenStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
