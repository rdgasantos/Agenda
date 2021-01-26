import { UsuarioEvento } from './../_models/UsuarioEvento';
import { EventoService } from './../_services/evento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Evento } from '../_models/Evento';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { error } from 'protractor';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.scss']
})
export class EventoCreateComponent implements OnInit {

  evento!: Evento;
  registerForm!: FormGroup;
  userId = this.route.snapshot.params['id'];
  model: UsuarioEvento = {
    userId: 0,
    eventId: 0
  };

  constructor(
      private fb: FormBuilder
    , private localeService: BsLocaleService
    , private eventoService: EventoService
    , private router: Router
    , private toastr: ToastrService
    , private route: ActivatedRoute) {
      this.localeService.use('bt-br');
     }

  ngOnInit() {
    this.validation();
  }


  validation(){
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      data: ['', [Validators.required]],
      local: ['', [Validators.required]],
      tipo: ['', [Validators.required]]

    });
  }

  salvarEvento(){
    if (this.registerForm.valid){
      this.evento = Object.assign({}, this.registerForm.value);
      this.eventoService.addEvent(this.evento).subscribe(
        (evento: Evento) => {
          this.model.eventId = evento.id;
          console.log(evento);
        }, error => {
          this.toastr.error('Erro ao tentar criar novo evento!', 'ATENÇÃO:',  {timeOut: 3000});
          console.log(error);
        }
      );
    }
    this.model.userId = this.userId;
    this.eventoService.addUserEvent(this.model).subscribe(
      () => {
        this.toastr.success('Evento criado com Sucesso!');
        this.router.navigate([`eventos/${this.userId}`]);
      }
    );
  }

}
