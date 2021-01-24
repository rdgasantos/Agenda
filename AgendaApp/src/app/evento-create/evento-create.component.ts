import { EventoService } from './../_services/evento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { defineLocale, BsLocaleService, ptBrLocale } from 'ngx-bootstrap';
import { Evento } from '../_models/Evento';
import { Router } from '@angular/router';
defineLocale('pt-br', ptBrLocale);

@Component({
  selector: 'app-evento-create',
  templateUrl: './evento-create.component.html',
  styleUrls: ['./evento-create.component.scss']
})
export class EventoCreateComponent implements OnInit {

  evento!: Evento;
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder, private localeService: BsLocaleService, private eventoService: EventoService, private router: Router) {
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
        (novoEvento: Evento) => {
          console.log(novoEvento);
          this.router.navigate(['eventos']);
        }
      );
    }
  }

}
