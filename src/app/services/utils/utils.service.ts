import { Injectable } from '@angular/core';
import { WifiManagerService } from '../wifiManager/wifi-manager.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private wifi: WifiManagerService 
  ) { }

  extractPassFromCam(camName: string): string{
    let password: string = "";
    password = camName.substring(2);
    return password;
  }

  async checkCameraConnected(serialNumber: string){
    let ssid: string = "";
    let exit: boolean = false;
    await this.wifi.getMyConnection().then(resp =>{
      ssid = resp;
    }, error =>{
      ssid = "";
    });
    if( ssid !== "" && ssid.indexOf(serialNumber) !== -1)
      exit = true;
    return exit;
  }

  formatCameraDate(date: string): string{
    let subDate: string = date.substring(0, date.indexOf("+")).replace(":","-");
    let hourDate: string = date.substring(date.indexOf("+"));
    let dateFormed = new Date(subDate+hourDate);
    return dateFormed.toLocaleDateString() + " " + dateFormed.toLocaleTimeString();
  }
}
