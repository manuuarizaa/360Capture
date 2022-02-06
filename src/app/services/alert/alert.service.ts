import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private alertController: AlertController) { }

  async alertWithOkAndCancel(headermsg: string, msg: string, haveCancel: boolean, backDrop: boolean, mfunctionOk?: any ) {
    if(haveCancel){
      const alert = await this.alertController.create({
        header: headermsg,
        message: msg,
        mode: 'ios',
        backdropDismiss: backDrop,
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
          }, {
            text: 'Confirm',
            handler: () => {
              if(mfunctionOk !== undefined)
                mfunctionOk();
            }
          }
        ]
      });

      await alert.present();
    }else{
      const alert = await this.alertController.create({
        header: headermsg,
        message: msg,
        mode: 'ios',
        backdropDismiss: backDrop,
        buttons: [
          {
            text: 'Ok',
            handler: () => {
              if(mfunctionOk !== undefined)
                mfunctionOk();
            }
          }
        ]
      });

      await alert.present();
    }
  }
  
}
