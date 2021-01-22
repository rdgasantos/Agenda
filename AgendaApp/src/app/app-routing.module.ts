import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { EventosTdComponent } from './eventosTd/eventosTd.component';
import { EventoDeleteComponent } from './evento-delete/evento-delete.component';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { EventoCreateComponent } from './evento-create/evento-create.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'eventos',
    component: EventosTdComponent,
    data: { title: 'Meus Eventos'}
  },
  {
    path: 'eventodet/:id',
    component: EventoDetalheComponent,
    data: { title: 'Informações do evento'}
  },
  {
    path: 'eventoadd',
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
