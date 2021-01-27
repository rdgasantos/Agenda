import { UsuarioEvento } from './../_models/UsuarioEvento';
import { Evento } from '../_models/Evento';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from './../_services/usuario.service';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { BsModalRef} from 'ngx-bootstrap';
import { Usuario } from '../_models/Usuario';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {

  evento!: Evento;
  usuarios!: Usuario[];
  usuarioEvento: UsuarioEvento = {userId:0, eventId:0};
  modalRef!: BsModalRef;
  formConvidado!: FormGroup;
  eventoId = this.route.snapshot.params['id'];
  userId = this.route.snapshot.params['userid'];
  public esconderConvidar!: true;
  public esconderDetalhe!: true;

  constructor(
      private route: ActivatedRoute
    , private eventService: EventoService
    , private usuarioService: UsuarioService
    , private toastr: ToastrService
    , private formBuilder: FormBuilder
    ) { }

  ngOnInit() {

    this.getEvento();
    this.getUsuarios();
    this.criarForm();
    console.log(this.usuarioEvento);

  }

  getEvento() {

    this.eventService.getEvent(this.eventoId)
    .subscribe(
      (data: Evento) => {
      this.evento = data;
    });
  }

  getUsuarios(){
    this.usuarioService.getAllUsers().subscribe(
      (users: Usuario[]) => {
        this.usuarios = users;
      });
  }

  convidar(){
    this.usuarioEvento = this.formConvidado.value;
    this.usuarioEvento.eventId = this.route.snapshot.params['id'];
    console.log(this.usuarioEvento);
    this.eventService.addUserEvent(this.usuarioEvento).subscribe(
      () => {
        this.toastr.success('usuário convidado com sucesso!');
        this.formConvidado.reset();
      }, error => {
        this.toastr.error('Não foi possivel convidar', error);
      }
    );
  }

  criarForm(){
    this.formConvidado = this.formBuilder.group({
      userId: ['']
    });

  }

}
