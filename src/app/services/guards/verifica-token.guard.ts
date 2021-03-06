import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class VerificaTokenGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router) {}

  canActivate(): Promise<boolean> |  boolean  {

    console.log('Token guard');

    const token = this._usuarioService.token;
    // Recuperar la información del token
    const payload = JSON.parse(atob(token.split('.')[1]));
    // console.log(payload);
    const expirado = this.expirado(payload.exp);

    if (expirado) {
      this.router.navigate(['/login']);
      return false;
    }
    return this.verificaRenueva(payload.exp);
  }

  expirado(fechaExp: number) {
    const ahora = new Date().getTime() / 1000;
    if (fechaExp < ahora) {
      return true;
    } else {
      return false;
    }
}

  verificaRenueva(fechaExp: number): Promise<boolean> {
      return new Promise( (resolve, reject) => {
        let tokenExp = new Date(fechaExp * 1000);
        let ahora = new Date();

        ahora.setTime( ahora.getTime() + (1 * 60 * 60 * 1000));

        if (tokenExp.getTime() > ahora.getTime()) {
          resolve(true);
        } else {
          this._usuarioService.renuevaToken().subscribe( () => {
            resolve(true);
          }, () => {
            reject(false);
            this.router.navigate(['/login']);
          });
        }
      });
  }
}
