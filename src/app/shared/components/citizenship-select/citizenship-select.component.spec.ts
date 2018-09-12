import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenshipSelectComponent } from './citizenship-select.component';

describe('CitizenshipSelectComponent', () => {
  let component: CitizenshipSelectComponent;
  let fixture: ComponentFixture<CitizenshipSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenshipSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenshipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
