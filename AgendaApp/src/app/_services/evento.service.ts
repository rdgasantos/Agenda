import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Evento } from '../_models/Evento';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  baseURL = 'http://localhost:5000/api/event';

  constructor(private http: HttpClient, private toastr: ToastrService) {}

  getAllEvents(): Observable<Evento[]> {

    return this.http.get<Evento[]>(this.baseURL)
    .pipe(retry(2), catchError(this.handleError));

  }

  getEvent(id: number): Observable<Evento>{

    return this.http.get<Evento>(`${this.baseURL}/${id}`)
    .pipe(retry(1), catchError(this.handleError));
  }

  addEvent(evento: Evento): Observable<Evento>{

    return this.http.post<Evento>(this.baseURL, evento)
    .pipe(retry(1), catchError(this.handleError));
  }

  updateEvent(evento: Evento): Observable<Evento>{

    return this.http.put<Evento>(`${this.baseURL}/${evento.id}`, evento )
    .pipe(retry(1), catchError(this.handleError));

  }

  deleteEvent(id: number): Observable<Evento>{
    return this.http.delete<Evento>(`${this.baseURL}/${id}`)
    .pipe(retry(1), catchError(this.handleError));
  }


  handleError(error: HttpErrorResponse){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      // erro no lado do cliente
      errorMessage = error.error.message;
    }else{
      // erro no lado do servidor
      errorMessage = `Código do erro:${error.status},` + `menssage: ${error.message}`;
    }
    console.log(errorMessage);
    this.toastr.warning('Não foi possível executar a operação', 'ATENÇÂO:');
    return throwError(errorMessage);
  }

}
