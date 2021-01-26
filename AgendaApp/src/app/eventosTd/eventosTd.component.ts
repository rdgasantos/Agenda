import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsuarioEvento } from '../_models/UsuarioEvento';

@Component({
  selector: 'app-eventosTd',
  templateUrl: './eventosTd.component.html',
  styleUrls: ['./eventosTd.component.css']
})
export class EventosTdComponent implements OnInit {

 /*  evento = {} as UsuarioEvento;
  eventos!: any; */
  evento = {} as UsuarioEvento;
  eventos!: any;

  id = this.route.snapshot.params['id'];

  constructor(private eventoService: EventoService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getEventos();
    console.log(Date.now());
  }

  getEventos(){
   /*  this.eventoService.getAllEvents().subscribe( (eventos: Evento[]) => {
      this.eventos = eventos; }); */
    
    this.eventoService.getEventByUser(this.id).subscribe(
        (data: UsuarioEvento) => {
          this.eventos = data;
          console.log(this.eventos);
          //this.eventos = data.eventos;
        });
  }

  editEvento(){}

  deleteEvento(){}

}
