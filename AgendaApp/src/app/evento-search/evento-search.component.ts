import { FormGroup, FormBuilder } from '@angular/forms';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-evento-search',
  templateUrl: './evento-search.component.html',
  styleUrls: ['./evento-search.component.scss']
})
export class EventoSearchComponent implements OnInit {

  eventosSearchNome!: Evento[];
  pesquisaNome!: '';
  pesquisaData!: '';

  constructor(private eventoService: EventoService) { }

  ngOnInit() {
  }

  buscarNome(){
    console.log(typeof(this.pesquisaNome));
    if (this.pesquisaNome != null) {
      this.eventoService.getEventByName(this.pesquisaNome).subscribe(
        (resp: Evento[]) => {
          this.eventosSearchNome = resp;
          console.log(this.eventosSearchNome);
        }
      );
    }
  }

  buscarData(){
    console.log(this.pesquisaData);
    if (this.pesquisaData !== null) {
      this.eventoService.getEventByDate(this.pesquisaData).subscribe(
        (resp: Evento[]) => {
          this.eventosSearchNome = resp;
          console.log(this.eventosSearchNome);
        }
      );
    }
  }


}

