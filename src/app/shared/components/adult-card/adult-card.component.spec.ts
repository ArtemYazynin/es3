import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdultCardComponent } from './adult-card.component';

describe('AdultCardComponent', () => {
  let component: AdultCardComponent;
  let fixture: ComponentFixture<AdultCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdultCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdultCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
