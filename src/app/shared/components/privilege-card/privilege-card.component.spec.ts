import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivilegeCardComponent } from './privilege-card.component';

describe('PrivilegeCardComponent', () => {
  let component: PrivilegeCardComponent;
  let fixture: ComponentFixture<PrivilegeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PrivilegeCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
