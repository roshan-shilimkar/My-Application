import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';

@Injectable()
export class webApiManager {

  baseUrl: string = '';

  constructor(public http: Http) { }

  setBaseURL(apiUrl: string) {
    this.baseUrl = apiUrl;
  }

  callPostService(postActionUrl: string, postData: any) {
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
          reject(err);
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
        }, (err) => {
          reject(err);
        });
    });
  }

  callGetService(getServiceUrl: string, getParameters?: any) {
    let getURL: string = this.baseUrl + "/" + getServiceUrl + "/";
    if (getParameters != null) {
      let params: URLSearchParams = new URLSearchParams();
      for (let key in getParameters) {
        params.set(key, getParameters[key]);
      }
      getURL += "?" + params.toString();
      console.log(getURL);
    }
    return new Promise((resolve, reject) => {
      this.http.get(getURL)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
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
      console.log(delteURL);
    }

    return new Promise((resolve, reject) => {
      this.http.delete(delteURL)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }
}
