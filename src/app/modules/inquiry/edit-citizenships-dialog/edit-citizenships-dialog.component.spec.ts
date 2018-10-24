import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCitizenshipsDialogComponent } from './edit-citizenships-dialog.component';

describe('EditCitizenshipsDialogComponent', () => {
  let component: EditCitizenshipsDialogComponent;
  let fixture: ComponentFixture<EditCitizenshipsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCitizenshipsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCitizenshipsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
