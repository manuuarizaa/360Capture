import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from './image/image.pipe';

@NgModule({
    declarations: [
      ImagePipe
    ],
    imports: [
      CommonModule
    ],
    exports:[
      ImagePipe
    ]
  })
  export class PipesModule { }