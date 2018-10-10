import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentEducationPlaceCardComponent } from './current-education-place-card.component';

describe('CurrentEducationPlaceCardComponent', () => {
  let component: CurrentEducationPlaceCardComponent;
  let fixture: ComponentFixture<CurrentEducationPlaceCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CurrentEducationPlaceCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentEducationPlaceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
