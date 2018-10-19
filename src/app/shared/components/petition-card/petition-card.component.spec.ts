import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PetitionCardComponent } from './petition-card.component';

describe('PetitionCardComponent', () => {
  let component: PetitionCardComponent;
  let fixture: ComponentFixture<PetitionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PetitionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PetitionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
