import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils/utils.service';
import { ValidationService } from '../../services/validation/validation.service';
import { WifiManagerService } from '../../services/wifiManager/wifi-manager.service';
import { WifiData, CameraInfo } from '../../interfaces/interfaces';
import { ToastService } from '../../services/toast/toast.service';
import { AlertService } from '../../services/alert/alert.service';
import { Clipboard } from '@awesome-cordova-plugins/clipboard/ngx';
import { OpenNativeSettings } from '@awesome-cordova-plugins/open-native-settings/ngx';
import { ConnectionService } from '../../services/connection/connection.service';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-register-cam',
  templateUrl: './register-cam.page.html',
  styleUrls: ['./register-cam.page.scss'],
})
export class RegisterCamPage implements OnInit {

  registering: boolean = false;
  needPassword: boolean = false;
  newCamera: CameraInfo = {};
  backButton: boolean = true;

  constructor(
    private utils: UtilsService, 
    private validation: ValidationService, 
    private toast: ToastService, 
    private alert: AlertService, 
    private wifi: WifiManagerService,
    private openNative: OpenNativeSettings,
    private clipboard: Clipboard,
    private connection: ConnectionService,
    private datalocal: DataLocalService,
    private platform: Platform
  ) { }

  async ngOnInit() {
    if( this.platform.is("cordova"))
      await this.wifi.requestGeolocation();
  }

  changeDefaultPassword(){
    this.needPassword = !this.needPassword;
  }
  
  async registerDevice(){
    /* 
    1 - Obtenermos los datos del serial number
    2 - Comprobamos con un validador que cumple las condiciones
    3 - Si necesita contraseña la obtenemos del input, en otro caso la contraseña son los 8 últimos carácteres del serial number
    4 - Escaneamos las redes WIFI
    5 - Comprobamos si hay alguna red WIFI con un SSID que contiene el serial number de la cámara
    6 - Conectamos el dispositivo a la red WIFI
    7 - Comprobamos que la conexión es correcta obteniendo los datos de la cámara
    */
    this.registering = true;
    let serialNumber: string = (<HTMLInputElement>document.getElementById("serialNumber")).value;
    let password: string = "";

    if(this.needPassword)
      password = (<HTMLInputElement>document.getElementById("passwordCam")).value;
    else
      password = this.utils.extractPassFromCam(serialNumber);

    if(this.validation.checkCamName(serialNumber) && this.validation.checkPassword(password) && await this.wifi.isWifiEnabled()){
      let wifiList: WifiData[] = await this.wifi.getNetworkList();
      if(wifiList.length > 0){
        let cameraSSID: WifiData[] = wifiList.filter(ssid => ssid.SSID.indexOf(serialNumber) !== -1);
        console.log(cameraSSID);
        if( cameraSSID.length > 0){
          /* 
          Conexión con la cámara:
          Mostramos una alerta que lleva una función que conecta con la red WIFI
          */
          this.alert.alertWithOkAndCancel(`Connect with ${cameraSSID[0].SSID}`, `360Capture needs to access the WIFI network ${cameraSSID[0].SSID}, please connect the device to this network with the password: ${password}`, true, false, this.connectWithCamera.bind(this, cameraSSID[0].SSID, password) );
      
        }else{
          this.toast.presentToastError('No camera found, please turn on the camera wireless function');
        }
      }else{
        this.toast.presentToastError('No WiFi network found, please enable WIFI and give geolocation permissions to 360Capture');
      }
    }
    
    this.registering = false;
  }

  async connectWithCamera(cameraSSID: string, password: string){
    this.clipboard.copy(password);
    this.toast.presentToastSuccess(`Password from ${cameraSSID} copied to clipboard`);
    setTimeout(() => {
      this.openNative.open("wifi");
      this.alert.alertWithOkAndCancel(`Test connection`, `Let's check that the connection with ${cameraSSID} is correct`, true, false, this.checkConnection.bind(this));
    }, 2000);
  }

  async checkConnection(){
    this.registering = true;
    await this.connection.getCameraInfo().then( async resp =>{
      let data: CameraInfo = JSON.parse(resp.data);
      this.toast.presentToastSuccess(`Connection with ${data.model} successful`);
      await this.datalocal.saveCamera(data);
      await this.datalocal.getCameras();
    },error =>{
      this.toast.presentToastError('Error getting information from camera');
    });
    this.registering = false;
  }

}
