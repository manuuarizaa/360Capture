import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async presentToastSuccess(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: "success",
      position: "top",
      cssClass: "ion-text-center",
      mode: "ios",
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }

  async presentToastError(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 4000,
      color: "danger",
      position: "top",
      cssClass: "ion-text-center",
      mode: "ios",
      buttons: [
        {
          side: 'end',
          icon: 'close-circle-outline',
          handler: () => {
          }
        }
      ]
    });
    toast.present();
  }
  
}
