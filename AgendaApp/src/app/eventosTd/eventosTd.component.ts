import { DatePipe } from '@angular/common';
import { UsuarioEvento } from './../_models/UsuarioEvento';
import { EventoService } from './../_services/evento.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '../_models/Evento';


@Component({
  selector: 'app-eventosTd',
  templateUrl: './eventosTd.component.html',
  styleUrls: ['./eventosTd.component.css']
})
export class EventosTdComponent implements OnInit {

 /*  evento = {} as UsuarioEvento;
  eventos!: any; */
  evento = {} as Evento;
  eventos: any;
  eventoPr = {} as Evento;
  eventosPr: any;
  public dataAtual = new Date();
  public today: any;
  dataExtenso!: string;

  id = this.route.snapshot.params['id'];

  constructor(
      private eventoService: EventoService
    , private route: ActivatedRoute
    , private datePipe: DatePipe
              ) { }

  ngOnInit() {
    this.today = this.transformDate(this.dataAtual);
    this.dataExtenso = this.formatarDataExtenso(new Date());
    this.getEventos();
    this.getEventosPr();
  }

  getEventos(){

    this.eventoService.getEventByUserDate(this.id, this.today ).subscribe(
        (data: Evento[]) => {
          this.eventos = data;
        });
  }

  getEventosPr(){

    this.eventoService.getEventByUserDateLater(this.id, this.today).subscribe(
          (data: Evento[]) => {
            this.eventosPr = data;
          });
  }

  editEvento(){}

  deleteEvento(){}

  transformDate(date: Date){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  formatarDataExtenso(data: Date) {
    // Meses possíveis
    var meses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
    // Dias possíveis
    var diasSemana = ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'];
    // Partes da data informada
    var dia = data.getDate();
    var dias = data.getDay();
    var mes = data.getMonth();
    var ano = data.getFullYear();
    // Resultado
    var extenso = '';

    return extenso = diasSemana[dias] + ', ' + dia + ' de ' + meses[mes] + ' de ' + ano;
  }


}
