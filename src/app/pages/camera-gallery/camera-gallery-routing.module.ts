import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CameraGalleryPage } from './camera-gallery.page';

const routes: Routes = [
  {
    path: '',
    component: CameraGalleryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CameraGalleryPageRoutingModule {}
