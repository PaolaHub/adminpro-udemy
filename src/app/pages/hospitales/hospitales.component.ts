import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { Hospital } from '../../models/hospital.model';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  cargando: boolean = true;
  totalRegistros: number = 0;

  constructor(public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService) {
   }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( () => this.cargarHospitales());
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales(this.desde).subscribe( (hospitales: any) => {
      this.totalRegistros = this._hospitalService.totalHospitales;
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  actualizarImagen(id: string) {
    this._modalUploadService.mostrarModal('hospitales', id);
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this._hospitalService.buscarHospital(termino).subscribe( hospitales => {
      this.hospitales = hospitales;
    });
  }

  guardarHospital(hospital: Hospital) {
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  borrarHospital(hospital: Hospital) {

    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + hospital.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {
        this._hospitalService.borrarHospital(hospital._id).subscribe( () => {
          this.desde = 0;
          this.cargarHospitales();
        });
      }
    });
  }

  crearHospital() {
    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    })
    .then( (valor: string) => {

      if (!valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital(valor).subscribe( () => {
        this.desde = 0;
        this.cargarHospitales();
      });
    });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if (desde >= this.totalRegistros || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
 }
}
