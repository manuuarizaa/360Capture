import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  constructor(private domSanitizier: DomSanitizer){}

  transform(img: string): any {
    if( img )
      return this.domSanitizier.bypassSecurityTrustResourceUrl(img);
    else
      return './assets/images/noimage.jpg'
  }

}
