import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../../services/service.index';
import { Medico } from 'src/app/models/medico.model';

declare var swal: any;

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  totalMedicos: number = 0;
  desde: number = 0;
  cargando: boolean = true;

  constructor(
    public _medicoService : MedicoService
  ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {

    this.cargando = true;

    this._medicoService.cargarMedicos(this.desde).subscribe( medicos => {
       this.totalMedicos = this._medicoService.totalMedicos;
       this.medicos = medicos;
       this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {

    const desde = this.desde + valor;

    if (desde >= this.totalMedicos || desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
 }

  buscarMedico(termino: string) {

    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this.cargando = true;

    this._medicoService.buscarMedico(termino).subscribe( medicos => {
      this.medicos = medicos;
      this.cargando = false;
    });
  }

  borrarMedico(medico: Medico) {
    swal({
      title: '¿Esta seguro?',
      text: 'Esta a punto de borrar a ' + medico.nombre,
      icon: 'warning',
      buttons: true,
      dangerMode: true
    })
    .then( borrar => {

      if (borrar) {
        this._medicoService.borrarMedico(medico._id).subscribe( resp => {
          this.desde = 0;
          this.cargarMedicos();
        });
      }
    });
  }
}
