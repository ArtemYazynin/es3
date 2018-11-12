import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSpecHealthComponent } from './edit-spec-health.component';

describe('EditSpecHealthComponent', () => {
  let component: EditSpecHealthComponent;
  let fixture: ComponentFixture<EditSpecHealthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSpecHealthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSpecHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
