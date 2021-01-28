import { EventoService } from './_services/evento.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventosTdComponent } from './eventosTd/eventosTd.component';
import { DateTimeFormatedPipePipe } from './_helps/dateTimeFormatedPipe.pipe';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { EventoCreateComponent } from './evento-create/evento-create.component';
import { EventoDeleteComponent } from './evento-delete/evento-delete.component';
import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuarioCreateComponent } from './usuario-create/usuario-create.component';
import { UsuarioEditComponent } from './usuario-edit/usuario-edit.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { EventoSearchComponent } from './evento-search/evento-search.component';
import {DatePipe} from '@angular/common'





@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      EventosTdComponent,
      EventoEditComponent,
      EventoCreateComponent,
      EventoDeleteComponent,
      EventoDetalheComponent,
      UsuarioCreateComponent,
      UsuarioEditComponent,
      LoginComponent,
      HomeComponent,
      DateTimeFormatedPipePipe,
      EventoSearchComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2500,
      positionClass: 'toast-top-right'
    }),
    AccordionModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()


  ],
  providers: [
    EventoService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
