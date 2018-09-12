import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewPrivilegeComponent } from './preview-privilege.component';

describe('PreviewPrivilegeComponent', () => {
  let component: PreviewPrivilegeComponent;
  let fixture: ComponentFixture<PreviewPrivilegeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewPrivilegeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewPrivilegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
