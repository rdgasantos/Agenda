import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Evento } from '../_models/Evento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento!: Evento;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private eventService: EventoService) { }

  ngOnInit() {

    this.getEvento();
  }

  getEvento() {
    
    this.eventService.getEvent(this.route.snapshot.params['id'])
    .subscribe(
      (data: Evento) => {
      this.evento = data;
      console.log(this.evento);
    });
  }

}
