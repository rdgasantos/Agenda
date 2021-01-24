import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento!: Evento;
  modalRef!: BsModalRef;

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private eventService: EventoService
    , private modalService: BsModalService
    ) { }

  /* openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  } */

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

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
