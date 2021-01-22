import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.scss']
})
export class EventoEditComponent implements OnInit {

  id = 0;
  nome = '';
  descricao = '';
  data = null;
  local = '';
  tipo = null;
  usuario = [];
  eventoForm!: FormGroup;

  constructor( private router: Router
    , private route: ActivatedRoute
    , private eventService: EventoService
    , private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getEvento();
    this.eventoForm = this.formBuilder.group({
      'nome_evento' : [null, Validators.required],
      'nome_descricao' : [null, Validators.required],
      'nome_data' : [null, Validators.required],
      'nome_local' : [null, Validators.required],
      'nome_tipo' : [null, Validators.required],
      'nome_usuario' : [null, Validators.required],
    });
  }

  getEvento() {

    this.eventService.getEvent(this.route.snapshot.params['id'])
    .subscribe(
      (data: Evento) => {
      this.id = data.id;
      this.eventoForm.setValue({
        nome_evento : data.nome,
        nome_descricao : data.descricao,
        nome_data : data.data,
        nome_local : data.local,
        nome_tipo : data.tipo,
        nome_usuario : data.usuario
      });

    });
  }

}
