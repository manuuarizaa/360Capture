import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamerasPageRoutingModule } from './cameras-routing.module';

import { CamerasPage } from './cameras.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamerasPageRoutingModule,
    ComponentsModule
  ],
  declarations: [CamerasPage]
})
export class CamerasPageModule {}
