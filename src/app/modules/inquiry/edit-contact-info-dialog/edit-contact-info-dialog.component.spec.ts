import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactInfoDialogComponent } from './edit-contact-info-dialog.component';

describe('EditContactInfoDialogComponent', () => {
  let component: EditContactInfoDialogComponent;
  let fixture: ComponentFixture<EditContactInfoDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContactInfoDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContactInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
