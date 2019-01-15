import { AreaTypePipe } from './area-type.pipe';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CommonService } from '.';

describe('AreaTypePipe', () => {
  let pipe: AreaTypePipe;
  let fixture: ComponentFixture<AreaTypePipe>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AreaTypePipe],
      providers:[CommonService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaTypePipe);
    pipe = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });
});
