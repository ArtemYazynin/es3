import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecHealthCardComponent } from './spec-health-card.component';

describe('SpecHealthCardComponent', () => {
  let component: SpecHealthCardComponent;
  let fixture: ComponentFixture<SpecHealthCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecHealthCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecHealthCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
