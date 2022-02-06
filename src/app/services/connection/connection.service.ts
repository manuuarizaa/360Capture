import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';

const IP = environment.ipCamera;

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {

  filePosition: number = -20;
  entryCount: number = 20;

  constructor(
    private http: HttpClient,
    private httpCordova: HTTP
  ) {}

  resetCounter(){
    this.filePosition = -20;
    this.entryCount = 20;
  }

  getCameraInfo(){
    const url = `${IP}/osc/info`;
    const params = {};
    const headers = {};
    return this.httpCordova.get(url, params, headers);
  }

  getStatus(id: string){
    const url = `${IP}/osc/commands/status`;
    const params = {
      "id": id
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json"
    };
    this.httpCordova.setDataSerializer('json');
    return this.httpCordova.post(url, params, headers);
  }

  takePhoto(){
    const url = `${IP}/osc/commands/execute`;
    const params = {
      "name": "camera.takePicture",
      "parameters": {}
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json"
    };
    this.httpCordova.setDataSerializer('json');
    return this.httpCordova.post(url, params, headers);
  }

  getFiles(){
    this.filePosition += this.entryCount;
    const url = `${IP}/osc/commands/execute`;
    const params = {
      "name": "camera.listFiles",
      "parameters": {
        "fileType":"image",
        "startPosition": this.filePosition,
        "entryCount": this.entryCount,
        "maxThumbSize": 640,
      }
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json"
    };
    this.httpCordova.setDataSerializer('json');
    return this.httpCordova.post(url, params, headers);
  }

  deleteImages(fileURLs: string[]){
    const url = `${IP}/osc/commands/execute`;
    const params = {
      "name": "camera.delete",
      "parameters":{
        "fileUrls": fileURLs
      }
    };
    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      "Accept": "application/json"
    };
    this.httpCordova.setDataSerializer('json');
    return this.httpCordova.post(url, params, headers);
  }

  getImage(url){
    return this.httpCordova.sendRequest(url, {method: "get", responseType:"blob"})
  }
}