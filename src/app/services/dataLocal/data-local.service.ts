import { Injectable } from '@angular/core';
import { CameraInfo } from '../../interfaces/interfaces';
import { Storage } from '@ionic/storage-angular';
import { ToastService } from '../toast/toast.service';

const CAMERA_KEY = 'cameras';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  public cameras: CameraInfo[] = [];

  constructor(
    private storage: Storage,
    private toast: ToastService
  )
  { 
    this.init();
  }

  init(){
    this.storage.create();
  }

  async saveCamera(camera: CameraInfo){
    /*
    1 - Obtenemos los datos de la BD de cámaras 
    2 - Comprobamos si la cámara ya está guardada
    3 - Guardamos si no existe
    */
  const storedCameras: CameraInfo[] = await this.storage.get(CAMERA_KEY) || [];
  let duplicateCamera: CameraInfo[] = storedCameras.filter(cam => cam.serialNumber === camera.serialNumber);
  if (duplicateCamera.length > 0){
    this.toast.presentToastError(`${camera.model} with serial number ${camera.serialNumber} already exist`);
    return this.storage.get(CAMERA_KEY);
  }
  else
    storedCameras.unshift(camera);
    this.toast.presentToastSuccess(`${camera.model} successfully saved`);
    return this.storage.set(CAMERA_KEY, storedCameras);
  }

  async getCameras(){
    const myCameras: CameraInfo[] = await this.storage.get(CAMERA_KEY) || [];
    this.cameras = myCameras || [];
    return this.cameras;
  }

  async removeCamera(index: number){
    const myCameras: CameraInfo[] = await this.storage.get(CAMERA_KEY) || [];
    myCameras.splice(index, 1);
    return this.storage.set(CAMERA_KEY, myCameras);
  }

}
