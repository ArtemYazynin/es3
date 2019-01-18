import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injector } from '@angular/core';
import { async, TestBed, getTestBed } from '@angular/core/testing';
import { SERVER_URL } from '../app.module';
import { DataSourceService } from './data-source.service';


class Mock {
  constructor(public id: string, public name: string) { }
}

describe('InquiryDataSourceService', () => {
  let http: HttpTestingController;
  let service: DataSourceService<Mock>;
  let mocks = [
    new Mock("0", "Иванов"),
    new Mock("1", "Петров"),
    new Mock("2", "Сидоров"),
    new Mock("3", "Щукин"),
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
    service = new DataSourceService<Mock>(TestBed.get(HttpClient), TestBed.get(Injector), "mocks");
    http = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    http.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("gets", () => {
    gets(mocks, undefined);
  });

  it("gets with queryParams", () => {
    const index = 2;
    const queryParams = `name=${mocks[index].name}`;
    gets(mocks.filter(x => x.name == mocks[index].name), queryParams);
  });

  it("gets will be return empty array", () => {
    gets([], undefined)
  });

  it("get will return one of the mock", () => {
    get(mock.id, mock);
  });

  it("get will return null. Not existing ID", () => {
    let invalidId = (mocks.length + 1).toString();
    get(invalidId, null);
  });

  it("put should return VALID mock", () => {
    put.valid(mock);
  });
  it("put, without id", () => {
    put.invalid("", mock);
  });

  it("put, without obj", () => {
    put.invalid(mock.id, undefined);
  });

  it("post, should return mock", ()=>{
    service.post(mock).subscribe(response=>{
      expect(response).toEqual(mock);
    });
    const req = http.expectOne(service.api);
    expect(req.request.method).toEqual('POST');
    req.flush(mock);
  });

  it("post, should return null", ()=>{
    service.post(undefined).subscribe(response=>{
      expect(response).toBeNull();
    });
    http.expectNone(service.api);
  });

  let put = {
    valid: (obj: Mock) => {
      service.put(obj.id, obj).subscribe(response => {
        expect(response).toEqual(obj);
      });
      const req = http.expectOne(`${service.api}/${obj.id}`);
      expect(req.request.method).toEqual('PUT');
      req.flush(obj);
    },
    invalid: (id, obj: Mock) => {
      service.put(id, obj).subscribe(response => {
        expect(response).toBeNull();
      });
      http.expectNone(`${service.api}/`);
    }
  }

  let gets = (expectedMocks: Mock[], queryParams) => {
    service.gets(queryParams).subscribe(response => {
      expect(response.length).toEqual(expectedMocks.length);
    }, fail);
    const req = http.expectOne(queryParams ? `${service.api}?${queryParams}` : service.api);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedMocks);
  }

  let get = (id, expectedMock) => {
    service.get(id).subscribe(response => {
      expect(response).toEqual(expectedMock);
    }, fail);
    const expectedUrl = `${service.api}/${id}`
    const req = http.expectOne(expectedUrl);
    expect(req.request.url).toEqual(expectedUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(expectedMock);
  };
});
