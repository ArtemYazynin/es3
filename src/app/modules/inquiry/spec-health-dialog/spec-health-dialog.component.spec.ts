import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecHealthDialogComponent } from './spec-health-dialog.component';

describe('SpecHealthDialogComponent', () => {
  let component: SpecHealthDialogComponent;
  let fixture: ComponentFixture<SpecHealthDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpecHealthDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecHealthDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
