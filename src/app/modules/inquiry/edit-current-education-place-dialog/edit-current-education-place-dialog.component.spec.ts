import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCurrentEducationPlaceComponent } from '../shared/components/edit-current-education-place/edit-current-education-place.component';

describe('EditCurrentEducationPlaceDialogComponent', () => {
  let component: EditCurrentEducationPlaceComponent;
  let fixture: ComponentFixture<EditCurrentEducationPlaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditCurrentEducationPlaceComponent]
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
