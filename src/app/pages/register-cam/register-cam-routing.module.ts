import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterCamPage } from './register-cam.page';

const routes: Routes = [
  {
    path: '',
    component: RegisterCamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegisterCamPageRoutingModule {}
