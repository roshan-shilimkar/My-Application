import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { dateTimeUtil } from 'src/providers/dateTimeUtil';
import { GeneralFunctionsManager } from 'src/providers/generalFunctionsManager';
import { SettingsManager } from 'src/providers/settingsManager';
import { webApiManager } from 'src/providers/webApiManager';
import { HttpModule } from '@angular/http';
import { settingManager } from 'src/providers/settingManager';
import { Storage } from '@ionic/storage';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, SQLite, Geolocation, AndroidPermissions, dateTimeUtil, Storage, settingManager, GeneralFunctionsManager, SettingsManager, webApiManager],
  bootstrap: [AppComponent],
})
export class AppModule { }
