import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CameraGalleryPageRoutingModule } from './camera-gallery-routing.module';

import { CameraGalleryPage } from './camera-gallery.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CameraGalleryPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CameraGalleryPage]
})
export class CameraGalleryPageModule {}
