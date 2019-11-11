import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;

    // En el html, haremos que cuando el formulario se cierre, la variable oculto
  // contenta el string "oculto", y coja del styless la clase definida como ".oculto".
  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() {
    console.log('Modal upload listo');
   }

  ocultarModal() {
    this.oculto = 'oculto';
    this.tipo = null;
    this.id = null;
  }

  mostrarModal(tipo: string, id: string) {
      this.oculto = '';
      this.tipo = tipo;
      this.id = id;
  }
}
