import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditInstitutionsComponent } from './edit-institutions.component';

describe('EditInstitutionsComponent', () => {
  let component: EditInstitutionsComponent;
  let fixture: ComponentFixture<EditInstitutionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditInstitutionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
