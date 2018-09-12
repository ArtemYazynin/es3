import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewCurrentEducationPlaceComponent } from './preview-current-education-place.component';

describe('PreviewCurrentEducationPlaceComponent', () => {
  let component: PreviewCurrentEducationPlaceComponent;
  let fixture: ComponentFixture<PreviewCurrentEducationPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewCurrentEducationPlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewCurrentEducationPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
