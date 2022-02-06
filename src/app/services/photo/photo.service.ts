import { Injectable } from '@angular/core';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { CameraFile } from '../../interfaces/interfaces';
import { ToastService } from '../toast/toast.service';
import { ConnectionService } from '../connection/connection.service';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(
    private toast: ToastService,
    private connection: ConnectionService
  ) { }

  async downloadImage(file: CameraFile){
    let base64 = await this.getDataBlob(file.fileUrl);
    const savedFile = await Filesystem.writeFile({
      path: file.name,
      data: base64,
      directory: Directory.Documents,
    }).then(resp =>{
      this.toast.presentToastSuccess(`${file.name} downloaded successfully`);
    }, error =>{
      this.toast.presentToastError(`Error downloading ${file.name}`);
    });
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = this.getFileReader();
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  async  getDataBlob(url){
  var res = await this.connection.getImage(url);

  if(res.status === 200 || res.status === 304){
    var uri = await this.convertBlobToBase64(res.data) as string;
  }
  else
    uri = "";
  return uri;
  }

  /* Función que arregla que FileReader no se lanza en dispositivos */
  getFileReader(): FileReader {
    const fileReader = new FileReader();
    const zoneOriginalInstance = (fileReader as any)[
      "__zone_symbol__originalInstance"
    ];
    return zoneOriginalInstance || fileReader;
  }
}
