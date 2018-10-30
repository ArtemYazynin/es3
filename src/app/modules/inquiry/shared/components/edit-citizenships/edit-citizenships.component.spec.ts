import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCitizenshipsComponent } from './edit-citizenships.component';

describe('EditCitizenshipsComponent', () => {
  let component: EditCitizenshipsComponent;
  let fixture: ComponentFixture<EditCitizenshipsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCitizenshipsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCitizenshipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
