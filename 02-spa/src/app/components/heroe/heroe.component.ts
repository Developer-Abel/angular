
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroesService } from '../../servicios/heroes.service';



@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'
})



export class HeroeComponent {
   heroe: any = {};

  constructor( private activateRoute: ActivatedRoute, private  _heroesService: HeroesService) {

     this.activateRoute.params.subscribe( params => {
         // console.log(params['id']); //este parametro es lo que va a recivir el metodo de servicio
      this.heroe = this._heroesService.getHeroe(params['id']);
      console.log(this.heroe);
     });

   }

}
