import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditPreschoolInstitutionDialogComponent } from './edit-preschool-institution-dialog.component';

describe('PrivilegeDialogComponent', () => {
  let component: EditPreschoolInstitutionDialogComponent;
  let fixture: ComponentFixture<EditPreschoolInstitutionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditPreschoolInstitutionDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPreschoolInstitutionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
