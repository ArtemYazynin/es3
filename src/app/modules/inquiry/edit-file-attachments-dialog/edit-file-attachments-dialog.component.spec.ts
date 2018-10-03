import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFileAttachmentsComponent } from '../shared/components/edit-file-attachments/edit-file-attachments.component';

describe('EditFileAttachmentsDialogComponent', () => {
  let component: EditFileAttachmentsComponent;
  let fixture: ComponentFixture<EditFileAttachmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditFileAttachmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFileAttachmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
