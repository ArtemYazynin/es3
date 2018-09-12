import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeStepComponent } from './privilege-step.component';

describe('PrivilegeStepComponent', () => {
  let component: PrivilegeStepComponent;
  let fixture: ComponentFixture<PrivilegeStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
