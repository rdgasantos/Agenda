import { EventoService } from './_services/evento.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AccordionModule } from 'ngx-bootstrap/accordion';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { EventosTdComponent } from './eventosTd/eventosTd.component';
import { DateTimeFormatedPipePipe } from './_helps/dateTimeFormatedPipe.pipe';
import { EventoEditComponent } from './evento-edit/evento-edit.component';
import { EventoCreateComponent } from './evento-create/evento-create.component';
import { EventoDeleteComponent } from './evento-delete/evento-delete.component';
import { EventoDetalheComponent } from './evento-detalhe/evento-detalhe.component';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
      AppComponent,
      NavComponent,
      EventosTdComponent,
      DateTimeFormatedPipePipe,
      EventoEditComponent,
      EventoCreateComponent,
      EventoDeleteComponent,
      EventoDetalheComponent
   ],
  imports: [
    BrowserModule,
    AccordionModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule


  ],
  providers: [
    EventoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
