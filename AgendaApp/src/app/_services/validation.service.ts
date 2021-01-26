import { Injectable } from '@angular/core';
import { AbstractControl } from 'node_modules/@angular/forms';
import { EventoService } from './evento.service';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

constructor(private eventoService: EventoService) { }



 async verifyDate (date: string) {

  const result = await this.eventoService.getByData(date);

  console.log(result);

  if (result == null)
  {
    return true ;
  }

  return false;

}

}
