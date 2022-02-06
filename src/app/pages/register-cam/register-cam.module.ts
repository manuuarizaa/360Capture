import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegisterCamPageRoutingModule } from './register-cam-routing.module';

import { RegisterCamPage } from './register-cam.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegisterCamPageRoutingModule,
    ComponentsModule
  ],
  declarations: [RegisterCamPage]
})
export class RegisterCamPageModule {}
