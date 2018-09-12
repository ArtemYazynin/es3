import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactInfoStepComponent } from './contact-info-step.component';

describe('ContactInfoStepComponent', () => {
  let component: ContactInfoStepComponent;
  let fixture: ComponentFixture<ContactInfoStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactInfoStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactInfoStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
