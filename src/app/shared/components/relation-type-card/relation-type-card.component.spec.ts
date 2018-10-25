import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationTypeCardComponent } from './relation-type-card.component';

describe('RelationTypeCardComponent', () => {
  let component: RelationTypeCardComponent;
  let fixture: ComponentFixture<RelationTypeCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationTypeCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
