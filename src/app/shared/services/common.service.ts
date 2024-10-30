import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  userData: any;
  constructor() {}

  getToken() {
    const userInfo = localStorage.getItem('userinfo');
    if (userInfo) {
      this.userData = JSON.parse(userInfo);
    } else {
      this.userData = {};
    }
    return this.userData?.access_token;
  }
}
