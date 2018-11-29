import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadsCrumbsComponent } from './breads-crumbs.component';

describe('BreadsCrumbsComponent', () => {
  let component: BreadsCrumbsComponent;
  let fixture: ComponentFixture<BreadsCrumbsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadsCrumbsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadsCrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
