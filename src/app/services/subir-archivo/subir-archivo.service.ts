import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  // Tenemos que hacer en puro Vanila Javascript, porque angular aún no tiene
  // nada para este tipo de peticiones.

  // Tenemos que pasar el archivo en sí
  // El tipo : 'usuarios', 'hospitales', 'medicos'
  // Y el id también, esto nos permite hacer combinaciones como por ejemplo
  // esta foto es de un medico con id tal.
  subirArchivo(archivo: File, tipo: string, id: string) {

      return new Promise((resolve, reject) => {

        console.log("Promesa");
        // Ahora tenemos que crearnos el form-data (como lo hemos hecho en POSTMAN)
        // Es lo que tenemos que mandar o subir a la petición por AJAX.
        // Es el payload que yo quiero mandar a subir, esto es de JavaScrip puro
        const formData = new FormData();
        // Ahora inicializamos la petición AJAX.
        const xhr = new XMLHttpRequest();

        // Configuracion del form-data.
        // 1. Es el nombre que tenemos expcificado tambien en POSTMAN
        // 2. Es el value, en nuestro caso es el archivo.
        // 3. El nombre del archivo.
        formData.append('imagen', archivo, archivo.name);

        // Configuramos la petición AJAX
        // Para ser notificacos con cualquier cambio.
        // tslint:disable-next-line: only-arrow-functions
        xhr.onreadystatechange = function() {
            // Esto es como un observable, cada vez que cambie nos va a notificar
            // Pero a nosotros solo nos interesa un estado
            if (xhr.readyState === 4)  { // El estado de cuando termine (4)
                if (xhr.status === 200) {
                  resolve( JSON.parse(xhr.response) ); // En xhr.response tenemos la respuesta que POSTMAN nos daría
                } else {
                  reject(xhr.response);
                }
            }
        };

        const url = URL_SERVICIOS + `/upload/${tipo}/${id}`;
        xhr.open('PUT', url, true);
        xhr.send(formData);
    });
  }
}
