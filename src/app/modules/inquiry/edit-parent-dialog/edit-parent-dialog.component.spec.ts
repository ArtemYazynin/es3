import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditParentDialogComponent } from './edit-parent-dialog.component';

describe('EditParentDialogComponent', () => {
  let component: EditParentDialogComponent;
  let fixture: ComponentFixture<EditParentDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditParentDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditParentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
