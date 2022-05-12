import { ToastController } from "@ionic/angular";
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class GeneralFunctionsManager {
  mobileno: string = "";
  emailid: string = "";
  constructor(public toastctrl: ToastController, public storage: Storage) {
  }

  async presenterrortoast(msg: string) {
    const toast = await this.toastctrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000,
      cssClass: "errortoast",
    });
    toast.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastctrl.create({
      message: msg,
      position: 'bottom',
      duration: 3000,
      cssClass: "exittoast",
    });
    toast.present();
  }
}
