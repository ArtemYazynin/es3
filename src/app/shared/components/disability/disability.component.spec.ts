import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule, MatSelectModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { esConstant, SERVER_URL } from '../../../app.module';
import { DisabilityComponent } from './disability.component';

fdescribe('DisabilityComponent', () => {
  let component: DisabilityComponent;
  let fixture: ComponentFixture<DisabilityComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, MatCheckboxModule, HttpClientTestingModule, NoopAnimationsModule, MatSelectModule],
      providers: [
        { provide: SERVER_URL, useValue: "http://localhost:3500" },
        { provide: esConstant, useValue: {} }
      ],
      declarations: [DisabilityComponent],
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
