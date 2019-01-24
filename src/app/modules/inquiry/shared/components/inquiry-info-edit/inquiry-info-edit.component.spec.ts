import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InquiryInfoEditComponent } from './inquiry-info-edit.component';
import { Theme } from '../../../../../shared';

describe('InquiryInfoEditComponent', () => {
  let prepare = () => {
    TestBed.configureTestingModule({
      declarations: [InquiryInfoEditComponent]
    });
    let fixture = TestBed.createComponent(InquiryInfoEditComponent);
    fixture.detectChanges();
    return fixture;
  }

  it('should create', () => {
    expect(prepare().componentInstance).toBeTruthy();
  });

  it('Should fulfilled angular lifecycle hook', () => {
    TestBed.configureTestingModule({ declarations: [InquiryInfoEditComponent] }).compileComponents();
    let fixture2 = TestBed.createComponent(InquiryInfoEditComponent);
    spyOn(fixture2.componentInstance["cdr"], "markForCheck");
    fixture2.detectChanges();

    expect(fixture2.componentInstance.showEdit).toBeFalsy();//check ngOnInit
    expect(fixture2.componentInstance["cdr"].markForCheck).toHaveBeenCalled();//check ngAfterContentInit
  });

  it('should call emit', () => {
    let component = prepare().componentInstance;
    spyOn(component.edit, "emit");
    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalled();
  });

  it('getUnderlineStyle. Should return string.empty', () => {
    const component = prepare().componentInstance;
    const style = component.getUnderlineStyle();
    expect(style).toBe("");
  });

  it('getUnderlineStyle. Should return grayStyle', () => {
    const component = prepare().componentInstance;
    component.theme = Theme.Gray;
    const style = component.getUnderlineStyle();
    expect(style).toEqual(component.grayStyle);
  });

  it('getUnderlineStyle. Should return greenStyle', () => {
    const component = prepare().componentInstance;
    component.theme = Theme.Green;
    const style = component.getUnderlineStyle();
    expect(style).toEqual(component.greenStyle);
  });

  it('getUnderlineStyle. Should return undefined', () => {
    const component = prepare().componentInstance;
    component.theme = Theme.Red;
    const style = component.getUnderlineStyle();
    expect(style).toBeUndefined();
  });
});
