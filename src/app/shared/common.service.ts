import { Injectable } from '@angular/core';
import { Entity } from './entity';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  autoCompliteFilter<T extends Entity<string>>(collection: Array<T>, name: string): Array<T>{
    const filterValue = name.toLowerCase();
    return collection.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  displayFn(entity?: Entity<string>): string | undefined {
    return entity ? entity.name : undefined;
  }


  getIeVersion(){
    var myNav = navigator.userAgent.toLowerCase();
    return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : undefined;
  }
}
