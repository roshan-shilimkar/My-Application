import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/map';
import { GeneralFunctionsManager } from './generalFunctionsManager';


@Injectable()
export class Api {

  baseUrl: string = '';

  constructor(public http: Http, private globalfunc: GeneralFunctionsManager) { }

  callPostService(postActionUrl: string, postData: any) {
    console.log(postData);
    var postHeaders = new Headers();
    postHeaders.append('Content-Type', 'application/json');
    postHeaders.append('Access-Control-Allow-Origin', '*');
    postHeaders.append('If-None-Match', 'W/"397-wycaxpPQRXvs6MucuHeIdQ"');

    let options = new RequestOptions({ headers: postHeaders });
    console.log(postActionUrl);

    return new Promise((resolve, reject) => {
      this.http.post(this.baseUrl + "/" + postActionUrl + "/", postData, options)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (!navigator.onLine) {
            this.globalfunc.presentToast("No Internet Connection");
          }
          else {
            reject(err);
          }
        });
    });
  }

  callPutService(putActionUrl: string, putData: any) {
    var putHeaders = new Headers();
    putHeaders.append('Content-Type', 'application/json');
    putHeaders.append('Access-Control-Allow-Origin', '*');
    putHeaders.append('If-None-Match', 'W/"397-wycaxpPQRXvs6MucuHeIdQ"');

    let options = new RequestOptions({ headers: putHeaders });
    console.log(putActionUrl);
    return new Promise((resolve, reject) => {
      this.http.put(this.baseUrl + "/" + putActionUrl + "/", putData, options)
        .subscribe(res => {
          resolve(res);
          console.log(res);
        }, (err) => {
          if (!navigator.onLine) {
            this.globalfunc.presentToast("No Internet Connection");
          }
          else {
            reject(err);
          }
        });
    });

  }

  callGetService(getServiceUrl: string, getParameters: any) {
    if (getParameters != null) {
      let params: URLSearchParams = new URLSearchParams();
      for (let key in getParameters) {
        params.set(key, getParameters[key]);
      }
      getServiceUrl += "?" + params.toString();
      console.log(getServiceUrl);
    }

    return new Promise((resolve, reject) => {
      this.http.get(getServiceUrl)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (!navigator.onLine) {
            this.globalfunc.presentToast("No Internet Connection");
          }
          else {
            reject(err);
          }
        });
    });
  }


  callDeleteService(deleteServiceUrl: string, deleteParameters: any) {
    let delteURL: string = this.baseUrl + "/" + deleteServiceUrl + "/";
    if (deleteParameters != null) {
      let params: URLSearchParams = new URLSearchParams();
      for (let key in deleteParameters) {
        params.set(key, deleteParameters[key]);
      }
      delteURL += "?" + params.toString();
    }
    return new Promise((resolve, reject) => {
      this.http.delete(delteURL)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          if (!navigator.onLine) {
            this.globalfunc.presentToast("No Internet Connection");
          }
          else {
            if (!navigator.onLine) {
              this.globalfunc.presentToast("No Internet Connection");
            }
            else {
              reject(err);
            }
          }
        });
    });
  }
}
