import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';
import { UsuarioEvento } from '../_models/UsuarioEvento';

@Component({
  selector: 'app-evento-search',
  templateUrl: './evento-search.component.html',
  styleUrls: ['./evento-search.component.scss']
})
export class EventoSearchComponent implements OnInit {

  eventosSearchNome!: Evento[];
  pesquisaNome!: '';
  pesquisaData!: '';
  userId = this.route.snapshot.params['id'];
  model: UsuarioEvento = {
    userId: 0,
    eventId: 0
  };

  constructor(private eventoService: EventoService, private toastr: ToastrService , private route: ActivatedRoute) { }

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

  participar(eventId: number){
    this.model.userId = this.userId;
    this.model.eventId = eventId;
    this.eventoService.addUserEvent(this.model).subscribe(
      () => {
        this.toastr.success('Você se inscreveu neste evento!');
      }
    );
  }


}

