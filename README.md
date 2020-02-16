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

# reutilizar la targeta de los guerreros Input() - enviar desde el padre al hijo

1. creamos un componente **ng g c components/heroe-targeta**
2. la targeta se encuentra en **heroes.component.html** pues copiamos la tarjeta (sin el *ng-for) y lo pegamos en el HTML del nuevo componente **heroe-targeta.components.html**
3. en la targeta **heroe-targeta.components.ts** vamos a crear el objeto heroe pero vamos a ponerle **Input()** antes de la variable, esto para que tome valores desde el **padre** (desde afuera), y para utiluzarlo debemos de importarlo.

``` typescript
import { Component, OnInit, Input} from '@angular/core';
```

``` typescript
@Input() heroe: any = {};
```
4. lo que sigue es ir a **heroes.component.html** y utizar la variable en la etiqueta **heroe-targeta**
``` HTML
<app-heroe-tarjeta [heroe]="heroe" *ngFor="let heroe of heroes; let i = index"></app-heroe-tarjeta>
```
**como vemos importando la variable heroe y utilizando el ngfor hasta este momento debemos de ver a todos los heroes listados nuevamente**

4. ahora lo que no funciona es el boton, y no funciona por que tiene una funcion que es **verHeroe()** que no hemos declarado todavia en el componente de **heroe-tarjeta** esta funcion lo que hace es que envia el id del heroe. Declaramos esta funcion en el componente y para que se visualice el id pues debemos de importarlo con el **input** asi como se hizo con la variable heroe.
``` typescript
@Input() idx: number;
  verHeroe(){
  this.idx;
  console.log(this.idx);
}
```
**En este paso al pulsar el boton deberiamos de ver en la consola el id del heroe, ahora solo hace falta redirigirlo**

5. para redirigirlo en la funcion **Verheroe** devemos de poner la ruta y utilizar el **this.idx**, IMPORTANTE para redirigir se utiliza en metodo **navigate** de router, y para poder utilizarlo debemos primero importar el router, y declararlo en el constructor
``` typescript
import { Router } from '@angular/router';

constructor(private router: Router) { 
    
  }
verHeroe(){
  // this.idx;
  // console.log(this.idx);
  this.router.navigate(['/heroe', this.idx]);
}
```
**con esto al pulsar al boton ver mas, redirige al heroe original y nuevamente al pulsar regresar te muestra todos los heroes**

- Pero lo que queremos es reutilizar la targeta entonces la targeta de heroes debe de ser la misma que debe de estar en heroe2 (que es la targeta que se muestra cuando se busca), asi que borramos la targeta de heroes2 y solamente ponemos la etiqueta **<app-heroe-tarjeta>** con el **ngFor** y en ves de **heroes** vamos a recibir a **heroe2**
``` html
<app-heroe-tarjeta [heroe]="heroe" [idx]="i" *ngFor="let heroe of heroe2; let i = index"></app-heroe-tarjeta>
```
**Hasta heste momento debemos de poder buscar a cualquier heroe pero no vamos a poder regresar con el boton por que la pulsar siempre nos regresara el primer elemento del arreglo**

# output() - enviar datos desde el hijo al padre

1. En la tarjeta de ver heroes, cuando pulsas el boton te manda al heroe individual, vamos a programar el boton de regresar, entonces lo que se va hacer es que desde el hijo (heroe-tarjeta) utilicemos una funcion que esta en el padre (heroes) para eso vamos a ocupar el **output** y va hacer lo mismo, se tiene que importar IMPORTANTE lleva algo adicional que es **EventEmitter** este es el que nos va a manejar los eventos (parametros) 
``` typescript
import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
```
2. declaramos el **output** y le decimos al **EventEmitter** que tipo de dato va a recibir (en este caso es de tipo number por que vamos a recivir el id) y lo instanciamos dentro del constructor.
``` typescript
@Output() heroeSeleccionado: EventEmitter<number>;

constructor(private router: Router) { 
  this.heroeSeleccionado = new EventEmitter();
}
```
3. ahora en la funcion **verHeroe()** llamamos a *heroeSeleccionado* y lo que vamos a emitir es el idx (aun que podemos emitir cualquier dato)
``` typescript
verHeroe(){
  this.heroeSeleccionado.emit(this.idx)
}
```
4. ya solo queda declararlo en **heroes.component.html**, en ves de **(click)** vamos a poner la variable **heroeSeleccionado** que es la que declaramos en el hijo (heroe-targeta) y lo igualalmos a la funcion **verHeroe()** IMPORTANTE fijarse que de parametro se pasa el *event* con el signo de dolar **$**
``` html
<app-heroe-tarjeta (heroeSeleccionado)="verHeroe($event)" [heroe]="heroe" [idx]="i" *ngFor="let heroe of heroes; let i = index"></app-heroe-tarjeta>
```
# lo de output solo fue para ver como se utliza o como se mandan datos de hijo a padre, no lo vamos a incluir en nuestro proyecto
- asi que regresamos la funcion verHero() al codigo original
``` typescript
this.router.navigate(['/heroe', this.idx]);
```
- pero con esto nos genera un problema, al buscar los heroes y al regresar siempre nos regresa acuaman y esto pasa por que es el numero 0 de nuestro arreglo, que no le pusimos un id por default. asi que vamos a modificar nuestro codigo para que a la ora de mostra el arreglo que imprimamos tambien un id del heroe. **y eso se encuentra en el servicio heroes**

1. en ves de **for( let heroe of heroes){}** creamos un heroe normal **for( let i=0; i < this.heroes.length; i++)** y tambien creamos una variable deonde guardara a nuestro heroe o heroes **let heroe = this.heroes[i];** por ultimo dentro del if añadimos el indice para que al imprimir el arreglo ya tenga un indice definido **heroe.indice = i;** y es todo lo que se hace en este archivo
``` typescript
for( let i=0; i < this.heroes.length; i++) {
      
  let heroe = this.heroes[i];

  let nombre = heroe.nombre.toLocaleLowerCase();

  if( nombre.indexOf(termino) >= 0){
    heroe.indice = i;
    heroesArr.push(heroe);
  }
}
```
2. verificamos que todo este correcto y que realmente de inserto el indice, para eso vamos a **heroe2.component** y hacemos un console

``` typescript
console.log(this.heroe2 );
```
- si todo va bien veremos en el console los datos del guerrero y el indice asignado, ahora ya solo falta llamarlo en de archivo **heroe2.component**

``` html
<app-heroe-tarjeta [heroe]="heroe" [idx]="heroe.indice" *ngFor="let heroe of heroe2"></app-heroe-tarjeta>
```
**si nos damos cuenta en ves de utilizar el i (let i = index) utilizamos el indice de la propiedad (heroe.indice)**
# con esto terminamos esta seccion de heroes 

```
```
