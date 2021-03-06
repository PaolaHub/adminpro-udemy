import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  recuerdame: boolean = false;
  email: string;

  auth2: any;

  constructor(
    public route: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    // Si no existe el email, no guardes nada.
    this.email = localStorage.getItem('email') ||  '';
    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  googleInit() {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '275478591728-sdmersaqc5agrmg4712emf73orj2drp1.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });

        this.attachSignIn(document.getElementById('btnGoogle'));

      });
  }

  attachSignIn(element){
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      // let profile = googleUser.getBasicProfile();
      // console.log(profile);
      const token = googleUser.getAuthResponse().id_token;
      // this._usuarioService.loginGoogle(token).subscribe(correcto => this.route.navigate(['/dashboard']));
      this._usuarioService.loginGoogle(token).subscribe(correcto => window.location.href = '#/dashboard');
    });
  }

  ingresar(forma: NgForm) {

    if (forma.invalid) {
      return;
    }

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe( correcto => this.route.navigate(['/dashboard']));
  }

}
