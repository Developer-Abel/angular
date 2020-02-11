
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { CreadorComponent } from './components/creador/creador.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { DragonballsComponent } from './components/dragonballs/dragonballs.component';
import { DragonballComponent } from './components/dragonball/dragonball.component';
import { Heroe2Component } from './components/heroe2/heroe2.component';






const APP_ROUTES: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'about', component: AboutComponent },
    { path: 'heroes', component: HeroesComponent },
    { path: 'creador', component: CreadorComponent},
    { path: 'heroe/:id', component: HeroeComponent}, // segunda forma de crear una ruta con parametros
    { path: 'dragonballs', component: DragonballsComponent },
    { path: 'dragonball/:id', component: DragonballComponent}, // no olvidar el id -> :id
    { path: 'heroe2/:id2', component: Heroe2Component},
    { path: '**', pathMatch: 'full', redirectTo: 'home'}
];


export  const APP_ROUTING = RouterModule.forRoot(APP_ROUTES); // useHash: true



