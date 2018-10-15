import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpInterceptor } from './http-interceptor';
import { map } from 'rxjs/operators';
import { AreaType } from './models/area-type.enum';
import { Area } from './models/area.model';
import { SERVER_URL } from '../app.module';

@Injectable()
export class AreaService {

  constructor(private http: HttpInterceptor, @Inject(SERVER_URL) private serverUrl) { }

  getAreas(type: AreaType): Observable<Array<Area>> {
    switch (type) {
      case AreaType["Муниципалитет"]:
        return this.http.get(`${this.serverUrl}/municipalities`).pipe(map(result => {
          return <Array<Area>>result.json();
        }));

      default:
        break;
    }
  }
  getCurrentMunicipality(): Observable<Area> {
    return this.http.get(`${this.serverUrl}/currentMunicipality`).pipe(map(result => {
      return <Area>result.json();
    }));
  }
}
