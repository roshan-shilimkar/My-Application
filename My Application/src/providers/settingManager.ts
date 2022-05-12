/*
 * Provider loginManger
 * Use         : used to manage login session at ionic level and oops class reponsible for user
 * Create Date : 01/11/2017
 * Added By    : HVB
 *  
*/
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
// import { LoginData } from 'src/interfaces/WebApiSettings';

@Injectable()
export class settingManager {
    ;
  MarketType = 'mTime';
  Theme: string = "theme";
  DefaultPage: string = "page";
  FCMNoti: string = "FCM";
  recent_search: string = "test";
  LoginDetails: string = "logindata";
  constructor(
    public storage: Storage
  ) { }
  async ngOnInit() {
    await this.storage.create();
  }
}
