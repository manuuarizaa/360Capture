import { Component, Input, OnInit } from '@angular/core';
import { CameraInfo } from '../../interfaces/interfaces';

@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss'],
})
export class CameraComponent implements OnInit {
  @Input() camera: CameraInfo = {};
  @Input() goToGallery: any;
  @Input() deleteCamera: any;

  constructor() { }

  ngOnInit() {
    
  }

}
