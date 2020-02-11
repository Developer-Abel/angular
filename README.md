# angular
proyectos angular

Pipes:
uppercase: lo pasa a mayusculas
date: muestra el año, mes y dia, en este caso solo año
{{heroe.nombre | uppercase}} <small>({{heroe.aparicion | date:"y"}})</small>

<!-- recorrer un array -->
for(let index of array){
    index.nombre
}
<!-- **************************** -->
creando una ruta completa
1.- crear un componente para que genere el HTML, y es alli donde vamos a redirigir.

2.- importar nuestro componente creado a routes.ts
import { Heroe2Component } from './components/heroe2/heroe2.component';

y se declara la ruta en  const APP_ROUTES: Routes = [];
{ path: 'heroe2/:id2', component: Heroe2Component}

3.- crear un boton el cual va a redirigir una funcion con el parametro (navbar.html)
<button (click)="buscarHeroe(buscarTexto.value)" type="button">Buscar</button>

4.-  en el componente del HTML creamos la funcion (navbar.ts) y redirigimos a la pagina
buscarHeroe(termino: string) {
    this.router.navigate(['/heroe2', termino]);
  }
adicional a esto se crea la variable router en el constructor (private router: Router) y se importa el Router
constructor( private router: Router) { }
import { Router } from '@angular/router';

5.- En el archivo service.ts creamos una funcion el cual va a manipular la variable que le mandemos.
    buscarHeroes(termino: string): Heroe[] {

      let heroesArr:Heroe[] = [];
      termino = termino.toLocaleLowerCase();

      for( let heroe of this.heroes) {

        let nombre = heroe.nombre.toLocaleLowerCase();
        if( nombre.indexOf(termino) >= 0){
          heroesArr.push(heroe);
        }
      }
      return heroesArr;

    }

6.- llamamos a la funcion ates creada en el componente nuevo, y para eso primero lo tenemos que importar y despues llamarlo en su costructor.
import { HeroesService } from '../../servicios/heroes.service';

export class Heroe2Component {
  heroe2: any [] = [];
  termino: string;

  constructor( private activateRoute: ActivatedRoute, private _heroesService: HeroesService) {
    this.activateRoute.params.subscribe(params =>{
      this.termino = params['id2'];
      this.heroe2 = this._heroesService.buscarHeroes(params['id2']);
       console.log("----"+this.heroe2 );
    })
   }


}

7.- listo lo podemos llamar en el HTML del componente nuevo

<h1>

    Buscando <small>{{termino}}</small></h1>
<hr>

<div class="card-columns">
    <div class="card animated fadeIn fast" *ngFor="let heroe of heroe2; let i = index">
        <img [src]="heroe.img" class="card-img-top" [alt]="heroe.nombre">
        <div class="card-body">
            <h5 class="card-title">{{heroe.nombre}}</h5>
            <p class="card-text">{{heroe.bio}}</p>
            <p class="card-text"><small class="text-muted">{{heroe.aparicion}}</small></p>
        </div>
        <button (click)="verHeroe(i)" class="btn btn-outline-primary btn-block">Ver mas</button>
    </div>
</div>