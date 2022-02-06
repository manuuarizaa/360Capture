import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PipesModule } from '../pipes/pipes.module';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { CameraComponent } from './camera/camera.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { CameraPictureComponent } from './camera-picture/camera-picture.component';

@NgModule({
    declarations: [
      //Añadir aquí los nuevos componentes
      HeaderComponent,
      SpinnerComponent,
      CameraComponent,
      PermissionsComponent,
      CameraPictureComponent
    ],
    exports: [
      //Añadir aquí los nuevos componentes
      HeaderComponent,
      SpinnerComponent,
      CameraComponent,
      PermissionsComponent,
      CameraPictureComponent
    ],
    imports: [
      IonicModule,
      CommonModule,
      PipesModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
  })
  export class ComponentsModule { }