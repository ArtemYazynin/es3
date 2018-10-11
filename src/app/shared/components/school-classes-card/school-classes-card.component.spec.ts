import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SchoolClassCardComponent } from './school-classes-card.component';


describe('InstitutionsCardComponent', () => {
  let component: SchoolClassCardComponent;
  let fixture: ComponentFixture<SchoolClassCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SchoolClassCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolClassCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
