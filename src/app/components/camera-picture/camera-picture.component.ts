import { Component, OnInit, Input } from '@angular/core';
import { CameraFile } from '../../interfaces/interfaces';
import { UtilsService } from '../../services/utils/utils.service';

@Component({
  selector: 'app-camera-picture',
  templateUrl: './camera-picture.component.html',
  styleUrls: ['./camera-picture.component.scss'],
})
export class CameraPictureComponent implements OnInit {
  @Input() file: CameraFile = {};
  @Input() downloadImage: any;
  @Input() deleteImage: any;
  @Input() addToSelected: any;
  downloading: boolean = false;

  constructor(
    public util: UtilsService
  ) { }

  ngOnInit() {
    
  }

  async downloadImg(){
    this.downloading = true;
    await this.downloadImage();
    this.downloading = false;
  }

}
