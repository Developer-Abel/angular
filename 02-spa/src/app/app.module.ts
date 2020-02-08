import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// rutas
import { APP_ROUTING } from './app.routes';

// servicios
import { HeroesService } from './servicios/heroes.service';
import { DragonballService } from './servicios/dragonball.service';



// componentes
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { CreadorComponent } from './components/creador/creador.component';
import { HeroeComponent } from './components/heroe/heroe.component';
import { DragonballsComponent } from './components/dragonballs/dragonballs.component';
import { DragonballComponent } from './components/dragonball/dragonball.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    HeroesComponent,
    CreadorComponent,
    HeroeComponent,
    DragonballsComponent,
    DragonballComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING
  ],
  providers: [
    HeroesService,
    DragonballService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
