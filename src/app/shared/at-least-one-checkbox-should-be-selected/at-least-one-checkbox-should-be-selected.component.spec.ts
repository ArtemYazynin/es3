import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtLeastOneCheckboxShouldBeSelectedComponent } from './at-least-one-checkbox-should-be-selected.component';

describe('AtLeastOneCheckboxShouldBeSelectedComponent', () => {
  let component: AtLeastOneCheckboxShouldBeSelectedComponent;
  let fixture: ComponentFixture<AtLeastOneCheckboxShouldBeSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtLeastOneCheckboxShouldBeSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtLeastOneCheckboxShouldBeSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
