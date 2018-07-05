import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecHealthComponent } from './spec-health.component';

describe('SpecHealthComponent', () => {
  let component: SpecHealthComponent;
  let fixture: ComponentFixture<SpecHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
