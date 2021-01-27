import { UsuarioEvento } from './../_models/UsuarioEvento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NodeWithI18n } from '@angular/compiler';

@Component({
  selector: 'app-eventosTd',
  templateUrl: './eventosTd.component.html',
  styleUrls: ['./eventosTd.component.css']
})
export class EventosTdComponent implements OnInit {

 /*  evento = {} as UsuarioEvento;
  eventos!: any; */
  evento = {} as UsuarioEvento;
  eventos: any;
  public dataAtual = new Date();

  id = this.route.snapshot.params['id'];

  constructor(
      private eventoService: EventoService
    , private route: ActivatedRoute
              ) { }

  ngOnInit() {
    this.getEventos();
    console.log(this.dataAtual);
  }

  getEventos(){
   /*  this.eventoService.getAllEvents().subscribe( (eventos: Evento[]) => {
      this.eventos = eventos; }); */

    this.eventoService.getEventByUser(this.id).subscribe(
        (data: UsuarioEvento) => {
          this.eventos = data;
          //this.eventos = data.eventos;
        });
  }

  editEvento(){}

  deleteEvento(){}

  dataHoje(){
    return Date.now();
  }


}
