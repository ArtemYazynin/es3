import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { esConstant, SERVER_URL } from './app.module';
import { InquiryInfoService } from './inquiry-info.service';
import { CommonService } from './shared/common.service';
import { InquiryService } from './shared/inquiry.service';
import { InquiryInfo } from './shared/models/inquiry-info.model';


describe('InquiryInfoService', () => {
  const defaultInquiryInfo = new InquiryInfo(undefined, undefined, undefined);
  let service: InquiryInfoService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpClient, Injector, CommonService, InquiryService, InquiryInfoService,
        { provide: esConstant, useValue: {} },
        { provide: SERVER_URL, useValue: "" }
      ]
    });
    service = TestBed.get(InquiryInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('gets. ', () => {
    spyOn(service["dataSource"], "gets").and.returnValue(of([defaultInquiryInfo, defaultInquiryInfo]));
    service.gets().subscribe(response => {
      expect(response.length).toEqual(2);
    });
    expect(service["dataSource"]["gets"]).toHaveBeenCalled();
  });

  it('get without id. Should NOT call dataSource.get("")', () => {
    spyOn(service["dataSource"], "get");
    service.get("").subscribe();
    expect(service["dataSource"]["get"]).not.toHaveBeenCalledWith("");
  });

  it('get with id equal whitespaces. Should NOT call dataSource.get("   ")', () => {
    const id = " ".repeat(3);
    spyOn(service["dataSource"], "get");
    service.get(id).subscribe();
    expect(service["dataSource"]["get"]).not.toHaveBeenCalledWith(id);
  });

  it('get with id. Should call dataSource.get("25")', () => {
    spyOn(service["dataSource"], "get").and.returnValue(of(defaultInquiryInfo));
    service.get("25").subscribe(x => {
      expect(x).toEqual(defaultInquiryInfo);
    });
    expect(service["dataSource"]["get"]).toHaveBeenCalledWith("25");
  });

  it('create with valid param. Should call dataSource.post()', () => {
    spyOn(service["dataSource"], "post").and.returnValue(of(defaultInquiryInfo));
    service.create(defaultInquiryInfo).subscribe(x => expect(x).toEqual(defaultInquiryInfo));
    expect(service["dataSource"]["post"]).toHaveBeenCalledWith(defaultInquiryInfo);
  });

  it('create with UNDEFINED param. Should NOT call dataSource.post()', () => {
    spyOn(service["dataSource"], "post");
    service.create(undefined).subscribe();
    expect(service["dataSource"]["post"]).not.toHaveBeenCalled();
  });

  it("update with valid params. Should call dataSource.put().", () => {
    spyOn(service["dataSource"], "put").and.returnValue(of(defaultInquiryInfo));
    service.update("25", defaultInquiryInfo).subscribe(x => {
      expect(x).toEqual(defaultInquiryInfo)
    });

    expect(service["dataSource"]["put"]).toHaveBeenCalledWith("25", defaultInquiryInfo);
  });

  it("update with INVALID params. Should NOT call dataSource.put().", () => {
    spyOn(service["dataSource"], "put").and.returnValue(of(defaultInquiryInfo));
    service.update("", undefined).subscribe();

    expect(service["dataSource"]["put"]).not.toHaveBeenCalledWith("25", defaultInquiryInfo);
  });

  it("getByInquiry with VALID id. Should call inquiryService.get(id)", () => {
    const id = "25";
    spyOn(service["inquiryService"], "get").and.returnValue(of({}));
    service.getByInquiry(id).subscribe();

    expect(service["inquiryService"].get).toHaveBeenCalledWith(id);
  });

  it("getByInquiry with INVALID id. Should NOT call inquiryService.get(id)", () => {
    spyOn(service["inquiryService"], "get").and.returnValue(of({}));
    service.getByInquiry(undefined).subscribe();

    expect(service["inquiryService"].get).not.toHaveBeenCalledWith(undefined);
  });

  it("isValid. Should return false", () => {
    expect(service["isValid"]("")).toBe(false);
  })

  it("isValid. Should return true", () => {
    expect(service["isValid"]("25")).toBe(true);
  })
});
