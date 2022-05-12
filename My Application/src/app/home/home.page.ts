import { Component } from '@angular/core';
import { GeneralFunctionsManager } from 'src/providers/generalFunctionsManager';
import { AndroidPermissions } from '@awesome-cordova-plugins/android-permissions/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  latitude: number;
  longitude: number;

  constructor(public globalfunc: GeneralFunctionsManager, public AndroidPermissions: AndroidPermissions, private Geolocation: Geolocation) {
    // This code is to check that you have access to location or not 
    this.AndroidPermissions.checkPermission(this.AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => {
        // this code is to get the current location ( latitude,longitude )
        this.Geolocation.getCurrentPosition().then((resp) => {
          this.latitude = resp.coords.latitude;
          this.longitude = resp.coords.longitude;
          this.globalfunc.presentToast("Your Latitude is " + resp.coords.latitude + " and Longitude is " + resp.coords.longitude + ".");

        }).catch(e => this.globalfunc.presenterrortoast(e));
      },
      err => {
        // This code is to request for permission of location
        this.AndroidPermissions.requestPermission(this.AndroidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(result => {
          // this code is to get the current location ( latitude,longitude )
          this.Geolocation.getCurrentPosition().then((resp) => {
            this.latitude = resp.coords.latitude;
            this.longitude = resp.coords.longitude;
            this.globalfunc.presentToast("Your Latitude is " + resp.coords.latitude + " and Longitude is " + resp.coords.longitude + ".");
          }).catch(e => this.globalfunc.presenterrortoast(e));
        })
      }
    );
  }
}
