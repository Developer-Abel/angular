import { Injectable } from '@angular/core';

@Injectable()
export class DragonballService {
    private guerreros = [
        {
          nombre: 'Vegeta',
          img: 'assets/img/vegeta.png',
          bio: 'lorem',
          frase: 'Maildito insecto'
        },
        {
          nombre: 'Krilin',
          img: 'assets/img/krilin.png',
          bio: 'lorem',
          frase: 'Mi esposa en numero 18'
        },
        {
            nombre: 'Frezzer',
            img: 'assets/img/freezer.png',
            bio: 'lorem',
            frase: 'Voy a gobernar el mundo'
          },
          {
            nombre: 'Picolo',
            img: 'assets/img/picolo.png',
            bio: 'lorem',
            frase: 'Yo soy picolo'
          },
          {
            nombre: 'Goku',
            img: 'assets/img/goku.png',
            bio: 'lorem',
            frase: 'Sere el mas fuerte del universo'
          },
          {
            nombre: 'Android 17',
            img: 'assets/img/numero17.png',
            bio: 'lorem',
            frase: 'Yo soy picolo'
          },
          {
            nombre: 'Hit',
            img: 'assets/img/hit.png',
            bio: 'lorem',
            frase: 'Mi mejor competidor es y sera Goku'
          },
          {
            nombre: 'Gohan',
            img: 'assets/img/gohan.png',
            bio: 'lorem',
            frase: 'Krilin es mi mejor amigo'
          }
      ];


    constructor() {
        console.log('servicio drango ball listo !!');
    }

    getGuerreros() {
        return this.guerreros;
    }

    getGuerrero(idx: string) {
         return this.guerreros[idx];
        // console.log("soy getGuerrero");
    }
 
}