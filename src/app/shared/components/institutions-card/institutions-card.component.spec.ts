import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { InstitutionsCardComponent } from './institutions-card.component';


describe('InstitutionsCardComponent', () => {
  let component: InstitutionsCardComponent;
  let fixture: ComponentFixture<InstitutionsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InstitutionsCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitutionsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
