import { Injectable } from '@angular/core';
import { isNullOrUndefined } from 'util';
import { Inquiry } from '../../../shared/models/inquiry.model';
import { inquiryType } from "../../../shared/models/inquiry-type";

@Injectable()
export class WizardStorageService {
  private prefix = "inquiry";


  get(type: string): Inquiry {
    const key = this.prefix + "/" + type;
    const inquiryData = JSON.parse(sessionStorage.getItem(key));
    const inquiry = new Inquiry(inquiryData);
    inquiry.type = inquiry.type || type;
    return inquiry;
  }
  set(type: string, data?: object | Array<any>) {
    if (!inquiryType || !inquiryType[type]) return;
    const key = this.prefix + "/" + type;

    if (isNullOrUndefined(data)) {
      //sessionStorage.removeItem(key);
    } else {
      const updatedStorage = (() => {
        let storage = this.get(type);
        if (!storage.type) {
          data["type"] = type;
        }
        return Object.assign({}, storage, data);
      })();
      sessionStorage.setItem(key, JSON.stringify(updatedStorage));
    }
  }
}
