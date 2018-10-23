import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPetitionDialogComponent } from './edit-petition-dialog.component';

describe('EditPetitionDialogComponent', () => {
  let component: EditPetitionDialogComponent;
  let fixture: ComponentFixture<EditPetitionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPetitionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPetitionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
