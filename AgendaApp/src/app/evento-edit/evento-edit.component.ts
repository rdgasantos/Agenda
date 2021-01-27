import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from '../_models/Evento';
import { EventoService } from '../_services/evento.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-edit',
  templateUrl: './evento-edit.component.html',
  styleUrls: ['./evento-edit.component.scss']
})
export class EventoEditComponent implements OnInit {

  evento!: Evento;
  registerForm!: FormGroup;
  userId = this.route.snapshot.params['userid'];

  constructor( private router: Router
    , private route: ActivatedRoute
    , private eventService: EventoService
    , private formBuilder: FormBuilder
    , private toastr: ToastrService
    ) { }

  ngOnInit() {

    this.getEvento();
    this.validation();

  }


  getEvento() {

    this.eventService.getEvent(this.route.snapshot.params['id'])
    .subscribe(
      (data: Evento) => {
        this.evento = data;
        this.registerForm.patchValue(this.evento);
        console.log(this.evento);
      });

    }

  editarEvento(){
    if (this.registerForm.valid){
      this.evento = Object.assign({id: this.evento.id}, this.registerForm.value);
      console.log(this.evento);
      this.eventService.updateEvent(this.evento).subscribe(
        (novoEvento: Evento) => {
          this.toastr.success("Evento editado com sucesso!");
          console.log(this.evento);
          this.router.navigate([`eventos/${this.userId}`]);
          this.eventService.getAllEvents();
          },error => {
            this.toastr.error('Erro ao tentar editar evento!', 'ATENÇÃO:',  {timeOut: 3000});
            this.router.navigate([`eventos/${this.userId}`]);
            console.log(error);
          }
          );
        }
    }

  validation(){
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      descricao: ['', [Validators.required, Validators.maxLength(100)]],
      data: ['', [Validators.required]],
      local: ['', [Validators.required]],
      tipo: ['', [Validators.required]]
    });
  }

}
