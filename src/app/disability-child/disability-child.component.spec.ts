import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisabilityChildComponent } from './disability-child.component';

describe('DisabilityChildComponent', () => {
  let component: DisabilityChildComponent;
  let fixture: ComponentFixture<DisabilityChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisabilityChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
