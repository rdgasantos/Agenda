import { Evento } from './../_models/Evento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eventosTd',
  templateUrl: './eventosTd.component.html',
  styleUrls: ['./eventosTd.component.css']
})
export class EventosTdComponent implements OnInit {

  evento = {} as Evento;
  eventos!: Evento[];

  constructor(private eventoService : EventoService) { }

  ngOnInit() {
    this.getEventos();
  }

  getEventos(){
    this.eventoService.getAllEvents().subscribe( (eventos: Evento[]) => {
      this.eventos = eventos;
    });
  }

  editEvento(){}

  deleteEvento(){}

}
