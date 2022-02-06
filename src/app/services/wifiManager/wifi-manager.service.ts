import { Injectable } from '@angular/core';
import { WifiWizard2 } from '@awesome-cordova-plugins/wifi-wizard-2/ngx';
import { Platform } from '@ionic/angular';
import { WifiData } from '../../interfaces/interfaces';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class WifiManagerService {

  constructor(
    private wifi: WifiWizard2, 
    private toast: ToastService, 
    private platform: Platform
  ) { }

  async getNetworkList(){
    let wifis: WifiData[] = [];
    if(this.platform.is("cordova")){
      await this.wifi.scan().then( resp =>{
        wifis = resp;
      }, error =>{

      });
    }
    return wifis;
  }

  async isWifiEnabled(){
    let enabled = false;
    if(this.platform.is("cordova"))
      enabled = await this.wifi.isWifiEnabled();

    if(!enabled)
      this.toast.presentToastError('Please turn on the WIFI')

    return enabled;
  }

  async requestGeolocation(){
    if(this.platform.is("cordova"))
      await this.wifi.requestPermission();
  }

  async getMyConnection(){
    let ssid: string = "";
    if(this.platform.is("cordova"))
      ssid = await this.wifi.getConnectedSSID();
    return ssid;
  }
  
}
