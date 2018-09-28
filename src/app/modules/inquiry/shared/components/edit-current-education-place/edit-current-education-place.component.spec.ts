import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCurrentEducationPlaceComponent } from './edit-current-education-place.component';

describe('EditCurrentEducationPlaceComponent', () => {
  let component: EditCurrentEducationPlaceComponent;
  let fixture: ComponentFixture<EditCurrentEducationPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCurrentEducationPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCurrentEducationPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
