import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FilesCardComponent } from './files-card.component';


describe('FilesCardComponent', () => {
  let component: FilesCardComponent;
  let fixture: ComponentFixture<FilesCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FilesCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
