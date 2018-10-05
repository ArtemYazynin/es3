import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeSelectorComponent } from './scope-selector.component';

describe('ScopeSelectorComponent', () => {
  let component: ScopeSelectorComponent;
  let fixture: ComponentFixture<ScopeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScopeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
