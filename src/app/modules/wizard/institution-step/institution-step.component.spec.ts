import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitutionStepComponent } from './institution-step.component';

describe('InstitutionStepComponent', () => {
  let component: InstitutionStepComponent;
  let fixture: ComponentFixture<InstitutionStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitutionStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
