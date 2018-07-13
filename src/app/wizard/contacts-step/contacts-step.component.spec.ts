import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactsStepComponent } from './contacts-step.component';

describe('ContactsStepComponent', () => {
  let component: ContactsStepComponent;
  let fixture: ComponentFixture<ContactsStepComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactsStepComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactsStepComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
