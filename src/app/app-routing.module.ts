import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'cameras',
    loadChildren: () => import('./pages/cameras/cameras.module').then( m => m.CamerasPageModule)
  },
  {
    path: 'register-cam',
    loadChildren: () => import('./pages/register-cam/register-cam.module').then( m => m.RegisterCamPageModule)
  },
  {
    path: 'camera-gallery',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  },
  {
    path: 'camera-gallery/:id',
    loadChildren: () => import('./pages/camera-gallery/camera-gallery.module').then( m => m.CameraGalleryPageModule)
  },
  {
    path: 'error',
    loadChildren: () => import('./pages/error/error.module').then( m => m.ErrorPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
