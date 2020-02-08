

import { Component} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DragonballService } from '../../servicios/dragonball.service';

@Component({
  selector: 'app-dragonball',
  templateUrl: './dragonball.component.html'
})
export class DragonballComponent  {
  guerrero: any = {};

  constructor( private activateRoute: ActivatedRoute, private _dragonballService: DragonballService) {
    this.activateRoute.params.subscribe( params => {
      this.guerrero = this._dragonballService.getGuerrero(params['id']);
      console.log(this.guerrero);
    });
  }

}
