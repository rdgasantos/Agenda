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


const routes: Routes = [

  {
    path: '',
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
    data: { title: 'Meus Eventos'}
  },
  {
    path: 'eventodet/:id',
    component: EventoDetalheComponent,
    data: { title: 'Informações do evento'}
  },
  {
    path: 'eventoadd/:id',
    component: EventoCreateComponent,
    data: { title: 'Criar Evento'}
  },
  {
    path: 'eventoedit/:id',
    component: EventoEditComponent,
    data: { title: 'Editar evento'}
  },
  {
    path: 'eventodel/:id',
    component: EventoDeleteComponent,
    data: { title: 'Excluir evento'}
  },
  {
    path: 'usuario/:id',
    component: UsuarioEditComponent,
    data: { title: 'Informações do usuário'}
  },
  {
    path: '',
    redirectTo: 'eventos',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'eventos',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
