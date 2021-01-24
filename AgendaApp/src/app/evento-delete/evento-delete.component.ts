import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { Evento } from '../_models/Evento';
import { ActivatedRoute, Router} from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-evento-delete',
  templateUrl: './evento-delete.component.html',
  styleUrls: ['./evento-delete.component.scss']
})
export class EventoDeleteComponent implements OnInit {

  evento!: Evento;
  constructor(private eventoService: EventoService, private route: ActivatedRoute, private router: Router, private toastr: ToastrService){ }

  ngOnInit() {
    this.getEvento();
  }

  showSucess(){
    this.toastr.success('Evento excluído com sucesso!');
  }
  getEvento(){
    this.eventoService.getEvent(this.route.snapshot.params['id'])
    .subscribe((dt: Evento) => {
      this.evento = dt;
    });
  }

  excluirEvento(){
    this.eventoService.deleteEvent(this.evento.id).subscribe(
      () => {
        this.showSucess();
        this.router.navigate(['eventos']);

      }, error => {
        this.toastr.error('Erro ao tentar Excluir evento!', 'ATENÇÃO:',  {timeOut: 3000});
        this.router.navigate(['eventos']);
        console.log(error);
      }
    );
  }

}
