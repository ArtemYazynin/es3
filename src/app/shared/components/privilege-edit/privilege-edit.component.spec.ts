import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeEditComponent } from './privilege-edit.component';

describe('PrivilegeEditComponent', () => {
  let component: PrivilegeEditComponent;
  let fixture: ComponentFixture<PrivilegeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
