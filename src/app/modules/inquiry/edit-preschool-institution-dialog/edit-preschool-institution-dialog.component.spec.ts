import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditInstitutionDialogComponent } from './edit-preschool-institution-dialog.component';

describe('PrivilegeDialogComponent', () => {
  let component: EditInstitutionDialogComponent;
  let fixture: ComponentFixture<EditInstitutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditInstitutionDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditInstitutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
