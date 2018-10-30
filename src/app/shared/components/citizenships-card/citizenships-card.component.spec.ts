import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitizenshipsCardComponent } from './citizenships-card.component';

describe('CitizenshipsCardComponent', () => {
  let component: CitizenshipsCardComponent;
  let fixture: ComponentFixture<CitizenshipsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitizenshipsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitizenshipsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
