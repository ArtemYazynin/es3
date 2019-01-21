import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationEnd, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { HeaderComponent } from './header.component';

class RouterMockService {
  public events: Observable<NavigationEnd>;
  constructor(public finalUrl: string) {
    this.events = of(new NavigationEnd(0, '', finalUrl));
  }
}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const data = {
    preschool: {
      systemname: "preschool",
      friendlyname: "ДОО"
    }
  }
  const url = {
    valid: `/wizard/${data.preschool.systemname}/childrenStep`,
    empty: "",
    withoutWizard: `withoutWizard/${data.preschool.systemname}/childrenStep`,
    withoutWizardAndInquiryType: "test/test2/test3"
  }
  let prepare = (finalUrl: string) => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [HeaderComponent],
      providers: [
        { provide: Router, useValue: new RouterMockService(finalUrl) },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
  }



  it('should create', () => {
    prepare(url.valid);
    expect(component).toBeTruthy();
  });

  it('URL not defined', () => {
    prepare(undefined);
    expect(component.visible).toBeUndefined();
    expect(component.inquiryFriendlyName).toBeUndefined();
  });

  it('URL contains spaces', () => {
    prepare(" ".repeat(2));
    expect(component.visible).toBeUndefined();
    expect(component.inquiryFriendlyName).toBeUndefined();
  });

  it('URL contains Wizard&InquiryType segments, should visible=true, inquiryFriendlyName = "ДОО", render section,', () => {
    prepare(url.valid);
    expect(component.visible).toEqual(true);
    expect(component.inquiryFriendlyName).toEqual(data.preschool.friendlyname);

    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("section")).toBeDefined();
    expect(compiled.querySelector('h1').textContent)
      .toContain(`Регистрация заявления в ${data.preschool.friendlyname}`);
  });

  it('URL contains InqruiryType segment. Should visible=false, inquiryFriendlyName = "ДОО"', () => {
    prepare(url.withoutWizard);
    expect(component.visible).toEqual(false);
    expect(component.inquiryFriendlyName).toEqual(data.preschool.friendlyname);
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("section")).toBeNull();
  });

  it('URL NOT contains wizard&inquiryType segments. Should visible=false, inquiryFriendlyName will be not defined', () => {
    prepare(url.withoutWizardAndInquiryType);
    expect(component.visible).toEqual(false);
    expect(component.inquiryFriendlyName).toBeUndefined();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector("section")).toBeNull();
  });
});
