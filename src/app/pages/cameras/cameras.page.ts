import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { CameraInfo } from '../../interfaces/interfaces';
import { AlertService } from '../../services/alert/alert.service';
import { UtilsService } from '../../services/utils/utils.service';
import { ToastService } from '../../services/toast/toast.service';

@Component({
  selector: 'app-cameras',
  templateUrl: './cameras.page.html',
  styleUrls: ['./cameras.page.scss'],
})
export class CamerasPage implements OnInit {
  cameras: CameraInfo[] = [];

  constructor(
    private router: Router, 
    private dataLocal: DataLocalService,
    private alert: AlertService,
    private util: UtilsService,
    private toast: ToastService
  ) 
  { 
    this.loadCameras();
  }

  ngOnInit() {
    
  }

  async loadCameras(){
    this.cameras = await this.dataLocal.getCameras();
  }

  goToRegisterDevice(){
    this.router.navigate(['register-cam']);
  }

  async goToGallery(id: number){
    if(await this.util.checkCameraConnected(this.cameras[id].serialNumber))
      this.router.navigate([`camera-gallery/${this.cameras[id].serialNumber}`]);
    else
      this.toast.presentToastError(`${this.cameras[id].model} ${this.cameras[id].serialNumber} not connected`);
  }

  deleteCamera(id:number){
    this.alert.alertWithOkAndCancel(`Delete camera`,`Do you want to delete ${this.cameras[id].model} ${this.cameras[id].serialNumber}?`, true, false, this.confirmDelete.bind(this, id));
  }

  async confirmDelete(id: number){
    await this.dataLocal.removeCamera(id);
    await this.dataLocal.getCameras();
  }

}
