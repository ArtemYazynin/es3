import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PersonService } from './person.service';
import { SERVER_URL } from '../app.module';
import { Person } from './models/person.model';

describe('PersonService', () => {
  let http: HttpTestingController;
  let service: PersonService;
  const mockPersons = [
    {
      id: "0",
      lastname: "Иванов",
      firstname: "Иван",
      middlename: "Иванович"
    },
    {
      id: "1",
      lastname: "Маслов",
      firstname: "Андрей",
      middlename: "Евгениевич"
    },
    {
      id: "2",
      lastname: "Казаков",
      firstname: "Александр"
    },
  ];
  let mockPerson:Person = <Person>mockPersons[0];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [PersonService, { provide: SERVER_URL, useValue: "http://localhost:3500" }]
    });
    service = TestBed.get(PersonService);
    http = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    http.verify();
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should have made one request to GET data from expected URL", ()=>{
    service.update(mockPerson.id, mockPerson).subscribe(data=>{
      expect(data).toEqual(mockPerson);
    },fail);

    const req = http.expectOne(`${service.dataSource.api}/${mockPerson.id}`);
    expect(req.request.method).toEqual('PUT');
    req.flush(mockPerson);
  });

});
