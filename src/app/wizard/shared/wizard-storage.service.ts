import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { inquiryType } from "../../shared/inquiry-type";
import { Storage } from "./storage";

@Injectable()
export class WizardStorageService {
  storage: BehaviorSubject<Storage> = new BehaviorSubject(new Storage());

  constructor(private activatedRoute: ActivatedRoute) { }

  update(type:string, data: object | Array<any>) {
    if(!inquiryType || !inquiryType[type] || !data) return;
    
    let request: Storage;
    this.storage.asObservable()
      .subscribe(result => {
        request = result;
      })
      .unsubscribe();
    const compilationSteps = Object.assign({}, request[type], data);
    request[type] = compilationSteps;
    this.storage.next(request);
  }
}
