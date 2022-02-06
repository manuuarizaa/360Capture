import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { DataLocalService } from '../../services/dataLocal/data-local.service';
import { CameraInfo, CameraFile } from '../../interfaces/interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { ConnectionService } from '../../services/connection/connection.service';
import { ToastService } from '../../services/toast/toast.service';
import { UtilsService } from '../../services/utils/utils.service';
import { AlertService } from '../../services/alert/alert.service';
import { PhotoService } from '../../services/photo/photo.service';

@Component({
  selector: 'app-camera-gallery',
  templateUrl: './camera-gallery.page.html',
  styleUrls: ['./camera-gallery.page.scss'],
})
export class CameraGalleryPage implements OnInit {

  cameras: CameraInfo[] = [];
  id: string = "";
  name: string = "";
  loading: boolean = false;
  backButton: boolean = true;
  files: CameraFile[] = [];
  selectedFiles: CameraFile[] = [];

  constructor(
    private dataLocal: DataLocalService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private connection: ConnectionService,
    private toast: ToastService,
    private alert: AlertService,
    private util: UtilsService,
    private ref: ChangeDetectorRef,
    private photo: PhotoService
  ) {
    this.loadCamera();
    this.loadGallery();
  }

  ngOnInit() {
  }

  async loadCamera(){
    /* 
    Las cámaras estan guardadas en memoria local. Si accedemos a esta página
    directamente tenemos que chequear que el id que nos viene por la ruta (id de la cámara) existe
    en la base de datos local, lo que significa que la tenemos registrada, en caso de que no esté
    registrada la cámara enviamos al usuario a la página de error.
    
    En caso de que si exista, comprobamos que la cámara está conectada por WIFI al dispositivo,
    si no lo está mandamos al usuario a la página de todas las cámaras avisando de que la cámara no está
    conectada. 
    
    Hacemos un segundo check comprobando que la cámara nos devuelve información desde su servidor local,
    en caso de que no devuelva esta información mandamos al usuario a la página de cámaras con un mensaje de error
    */
    this.cameras = await this.dataLocal.getCameras();
    this.id = this.activeRoute.snapshot.paramMap.get("id");
    this.cameras = this.cameras.filter( cam => cam.serialNumber === this.id);
    if(this.cameras.length === 0)
      this.router.navigate(['error'], {replaceUrl: true});
    else{
      this.name = `${this.cameras[0].model} - ${this.cameras[0].serialNumber}`;
      this.loading = true;
      if(!(await this.util.checkCameraConnected(this.cameras[0].serialNumber))){
        this.toast.presentToastError(`${this.name} not connected`);
        this.router.navigate(['cameras'], {replaceUrl: true});
        this.loading = false;
      }else{
        this.connection.getCameraInfo().then(resp =>{
          this.loading = false;
        }, error =>{
          this.toast.presentToastError(`Error getting ${this.name} data`);
          this.router.navigate(['cameras'], {replaceUrl: true});
          this.loading = false;
        });
      }
    }
  }

  async loadGallery(){
    /* 
    Reseteamos el contador de páginas para que nos pida las imágenes desde el principio a la cámara.
    Hacemos la petición creada en el servicio connection para que nos devuelva las últimas fotos tomadas con la cámara.
    */
    this.connection.resetCounter();
    await this.connection.getFiles().then( resp =>{
      this.files = JSON.parse(resp.data).results.entries;
    }, error => {
      console.log(error)
    });
  }

  async takePhoto(){
    /* 
    Tomamos una imágen y esperamos a que el status nos devuelva que se ha procesado al 100%.
    Una vez que la tengamos procesada al 100% actualizamos la galería para que se muestre la imagen tomada 
    */
    await this.connection.takePhoto().then(async resp =>{
      this.loading = true;
      while(this.loading){
        await this.connection.getStatus(JSON.parse(resp.data).id).then( respStatus =>{
          /* console.log(JSON.parse(respStatus.data).state); */
          if(JSON.parse(respStatus.data).state === "done"){
            this.loadGallery();
            this.loading = false;
          }
        }, error =>{
          this.loading = false;
        });
      }
    }, error =>{
      console.log(error);
      this.toast.presentToastError('Error taking photo');
    });
  }

  async downloadImage(file: CameraFile){
    await this.photo.downloadImage(file);
  }

  requestDeleteImage(file: CameraFile){
    this.alert.alertWithOkAndCancel(`${file.name}`, `Do you want to delete the file ${file.name}?`, true, false, this.deleteImages.bind(this, [file]) );
  }

  requestDeleteImages(){
    this.alert.alertWithOkAndCancel(`Delete ${this.selectedFiles.length} images`, `Do you want to delete the ${this.selectedFiles.length} selected images?`, true, false, this.deleteImages.bind(this, this.selectedFiles) );
  }

  async deleteImages(file: CameraFile[]){
    let urls: string[] = [];
    for(let i=0; i < file.length; i++)
      urls.push(file[i].fileUrl);
    await this.connection.deleteImages(urls).then(respDelete =>{
      for(let i=0; i < urls.length; i++){
        this.files = this.files.filter(f => f.fileUrl !== urls[i]);
        this.selectedFiles = this.selectedFiles.filter(f => f.fileUrl !== urls[i]);
      }
      this.ref.detectChanges();
    }, error=>{
      this.toast.presentToastError("Error deleting image");
    });
  }

  addToChecked(file: CameraFile){
    let filterFiles = this.selectedFiles.filter(f => f === file);
    if(filterFiles.length > 0)
      this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    else
      this.selectedFiles.push(file);
  }

  loadMoreImages(event){
    /*  
    Infinite scroll
    Si el número de ficheros es inferior obtenimos 
    a la posición que pedimos( filePosition + entryCount )
    entonces dejamos de pedir ya que no hay mas elementos
    */
    setTimeout(async ()=>{
      await this.connection.getFiles().then( resp =>{
        this.files = [...this.files, ...JSON.parse(resp.data).results.entries];
      }, error => {
        console.log(error)
      });
      event.target.complete();
      /* if(this.files.length < this.connection.filePosition + this.connection.entryCount)
        event.target.disabled = true; */
    }, 500);
  }

}
