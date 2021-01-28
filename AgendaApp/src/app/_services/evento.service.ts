import { Evento } from './../_models/Evento';
import { HttpClient, HttpResponse, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, Pipe } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UsuarioEvento } from '../_models/UsuarioEvento';

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

  getEventByUser(id: number): Observable<UsuarioEvento>{
    return this.http.get<UsuarioEvento>(`${this.baseURL}/getByUserId/${id}`)
    .pipe(retry(2), catchError(this.handleError));

  }

  getEventByName(nome: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/getByName/${nome}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  getEventByDate(data: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/getByDate/${data}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  getEventByUserDate(id: number, data: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/getByUserDate/${id}/${data}`)
    .pipe(retry(2), catchError(this.handleError));
  }

  getEventByUserDateLater(id: number, data: string): Observable<Evento[]>{
    return this.http.get<Evento[]>(`${this.baseURL}/getByUserDateLater/${id}/${data}`)
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

  addUserEvent(userEvent: UsuarioEvento): Observable<UsuarioEvento>{
    return this.http.post<UsuarioEvento>('http://localhost:5000/api/userEvent', userEvent)
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

  getByData(data: string): Observable<Evento[]>{

    const params: HttpParams = new HttpParams().set('date', data || '');
        return this.http.get<Evento[]>(`${this.baseURL}/api/getByDate`, { params: params });


    /* return this.http.get<Evento>(`${this.baseURL}/${data}`)
    .pipe(retry(1), catchError(this.handleError)); */
  }


}
