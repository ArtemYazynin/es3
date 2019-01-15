import { ApplicantTypePipe } from './applicant-type.pipe';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { CommonService } from './common.service';

describe('ApplicantTypePipe', () => {
  let pipe: ApplicantTypePipe;
  let fixture: ComponentFixture<ApplicantTypePipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ApplicantTypePipe],
      providers:[CommonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicantTypePipe);
    pipe = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
