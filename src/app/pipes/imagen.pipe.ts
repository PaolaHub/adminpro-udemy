import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/img';

    // Si no hay imagen
    if (!img) {
      return url + '/usuario/xxx'; // No image!
    }

    // Si es una imagen de Google
    if ( img.indexOf('http') >= 0) {
      return img;
    }

    switch (tipo) {

      case 'usuario':
        url += '/usuarios/' + img;
        console.log(url);
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
      default:
        url += '/usuarios/xxx';
        console.log('tipo de imagen no existe, usuario, medicos, hospitales');
    }

    return url;
  }

}
