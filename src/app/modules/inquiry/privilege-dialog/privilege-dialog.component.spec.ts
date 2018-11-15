import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrivilegeDialogComponent } from './privilege-dialog.component';

describe('PrivilegeDialogComponent', () => {
  let component: PrivilegeDialogComponent;
  let fixture: ComponentFixture<PrivilegeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrivilegeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrivilegeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
