import { error } from 'protractor';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../_services/usuario.service';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Evento } from '../_models/Evento';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Usuario } from '../_models/Usuario';
import { FormGroup } from '@angular/forms';
import { UsuarioEvento } from '../_models/UsuarioEvento';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento!: Evento;
  usuarios!: Usuario[];
  usuarioEvento!: UsuarioEvento;
  modalRef!: BsModalRef;
  registerForm!: FormGroup;
  eventoId = this.route.snapshot.params['id'];
  userId = this.route.snapshot.params['userid'];

  constructor(
      private router: Router
    , private route: ActivatedRoute
    , private eventService: EventoService
    , private modalService: BsModalService
    , private usuarioService: UsuarioService
    , private toastr: ToastrService
    ) { }

  /* openModal(template: TemplateRef<any>){
    this.modalRef = this.modalService.show(template);
  } */

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnInit() {

    this.getEvento();
    this.getUsuarios();
    this.usuarioEvento.eventId = this.eventoId;
  }

  getEvento() {

    this.eventService.getEvent(this.eventoId)
    .subscribe(
      (data: Evento) => {
      this.evento = data;
      console.log(this.evento);
    });
  }

  getUsuarios(){
    this.usuarioService.getAllUsers().subscribe(
      (users: Usuario[]) => {
        this.usuarios = users;
        console.log(this.usuarios);
      }
    );
  }

  convidar(){

    this.usuarioEvento.userId = Object.assign({}, this.registerForm.value);
    this.eventService.addUserEvent(this.usuarioEvento).subscribe(
      () => {
        this.toastr.success('usuário convidado com sucesso!');
      }, error => {
        this.toastr.error('Não foi possivel convidar', error);
      }
    );
  }

}
