import { Injectable } from '@angular/core';
import { WebApiSettings } from '../interfaces/WebApiSettings';

@Injectable()
export class SettingsManager {
    WEB_API_LOCAL: string = "WEBAPILOCAL";
    WEB_API: string = "WEBAPI";
    getCurrentSettings(settingName: string): any {
        switch (settingName) {
            case this.WEB_API_LOCAL:
                let setting: WebApiSettings = { BaseURL: "http://localhost:20636/api", TimeOutDuration: 0 };
                return setting;

            case this.WEB_API:
                let izurl: WebApiSettings = { BaseURL: "https://trade.investmentz.com/InvestmentzAppAPI/api/", TimeOutDuration: 0 };
                return izurl;
        }
    }
}