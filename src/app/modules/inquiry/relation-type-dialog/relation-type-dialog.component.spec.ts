import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelationTypeDialogComponent } from './relation-type-dialog.component';

describe('RelationTypeDialogComponent', () => {
  let component: RelationTypeDialogComponent;
  let fixture: ComponentFixture<RelationTypeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelationTypeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelationTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
