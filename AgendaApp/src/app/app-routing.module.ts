import { EventoSearchComponent } from './evento-search/evento-search.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { EventosTdComponent } from './eventosTd/eventosTd.component';
import { EventoDeleteComponent } from './evento-delete/evento-delete.component';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { EventoCreateComponent } from './evento-create/evento-create.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: UsuarioCreateComponent
      }
    ]
  },

  {
    path: 'eventos/:id',
    component: EventosTdComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'eventodet/:id/:userid',
    component: EventoDetalheComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eventoadd/:id',
    component: EventoCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eventoedit/:id/:userid',
    component: EventoEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eventodel/:id/:userid',
    component: EventoDeleteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuario/:id',
    component: UsuarioEditComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'search',
    component: EventoSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'home/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'home/login',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
