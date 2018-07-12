import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationTypeComponent } from './relation-type.component';

describe('RelationTypeComponent', () => {
  let component: RelationTypeComponent;
  let fixture: ComponentFixture<RelationTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
