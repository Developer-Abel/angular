
import { Component, OnInit } from '@angular/core';
import { DragonballService } from '../../servicios/dragonball.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dragonballs',
  templateUrl: './dragonballs.component.html'
})
export class DragonballsComponent implements OnInit {

  guerreros: any = [];

  constructor(private _dragonballService: DragonballService,
              private _router: Router
    ) { }

  ngOnInit() {
    this.guerreros = this._dragonballService.getGuerreros();
    console.log(this.guerreros);
  }
  verGuerreros(idx){ // solo manda un id por la url ->se debe importar el router
   this._router.navigate(['/dragonball', idx]);
   console.log(idx);
  }

}
