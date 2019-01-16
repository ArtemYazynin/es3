import { TestBed, async } from '@angular/core/testing';

import { DataSourceService } from './data-source.service';
import { Inquiry } from './models/inquiry.model';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SERVER_URL } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Injector } from '@angular/core';

class Mock {
  constructor(public id:string, public name:string){}
}

fdescribe('InquiryDataSourceService', () => {
  let http: HttpTestingController;
  let service: DataSourceService<Mock>;
  let mocks = [
    new Mock("0","Иванов"),
    new Mock("1","Петров"),
    new Mock("2","Сидоров"),
    new Mock("3","Щукин"),
  ];
  let mock = mocks[0];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        HttpClient, Injector,
        { provide: SERVER_URL, useValue: "http://localhost:3500" }
      ]
    });
    service = new DataSourceService<Mock>(TestBed.get(HttpClient), TestBed.get(Injector),"mocks");
    http = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("gets", ()=>{
    service.gets().subscribe(response=>{
      expect(response.length).toEqual(mocks.length);
    },fail);
    const req = http.expectOne(service.api);
    expect(req.request.method).toEqual('GET');
    req.flush(mocks);
  });

  it("gets with queryParams", ()=>{
    const index = 2;
    const queryParams = `name=${mocks[index].name}`;
    service.gets(queryParams).subscribe(response=>{
      expect(response.length).toEqual(mocks.filter(x=>x.name == mocks[index].name).length);
    },fail);
    const req = http.expectOne(`${service.api}?${queryParams}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mocks.filter(x=>x.name == mocks[index].name));
  });

  it("gets will be return empty array", ()=>{
    service.gets().subscribe(response=>{
      expect(response.length).toEqual(0);
    },fail);
    const req = http.expectOne(service.api);
    expect(req.request.method).toEqual('GET');
    req.flush([]);
  });

});
