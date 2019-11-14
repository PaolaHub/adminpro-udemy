import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs'; // Reactiv extensions
import { retry, map, filter } from 'rxjs/operators';


@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    subscription: Subscription;

   constructor() {

    // Los observables tienen tres callback !
    this.subscription = this.regresaObservable()
    .subscribe(
      // Cuando se llama a un next para mandale información mientras escucha.
      numero => console.log('Subs ', numero),
      // Cuando hay un error.
      error => console.error('Error en el obs', error),
      // Cuando el observador termino.
      () => console.log('El observador termino')
    );

   }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscription.unsubscribe();
  }

  regresaObservable(): Observable<any>{

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      const intervalo = setInterval(
        () => {

          contador += 1;

          const salida = {
            valor: contador
          };

          // Vamos mandándole datos.
          observer.next(salida);

          // if(contador == 3){
          //   // Así paramos el intervalo.

          //   clearInterval(intervalo);
          //   // Así se para la subscripción para dejar de escuchar.
          //   observer.complete();
          // }

          // if(contador == 2){
          //   //clearInterval(intervalo);
          //   observer.error('Auxilio!')
          // }
        }, 1000)
      }).pipe(
        // map(resp => { return resp.valor})
        map(resp => resp.valor),
        filter( (valor, index) => {
          if (valor % 2 === 1) {
            return true;
          } else  {
            return false;
          }
        }));
  }

}
