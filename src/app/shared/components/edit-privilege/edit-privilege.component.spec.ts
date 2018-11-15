import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPrivilegeComponent } from './edit-privilege.component';

describe('PrivilegeEditComponent', () => {
  let component: EditPrivilegeComponent;
  let fixture: ComponentFixture<EditPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
