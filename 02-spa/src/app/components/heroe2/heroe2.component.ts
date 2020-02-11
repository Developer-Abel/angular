import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../servicios/heroes.service';



@Component({
  selector: 'app-heroe2',
  templateUrl: './heroe2.component.html'
})
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
