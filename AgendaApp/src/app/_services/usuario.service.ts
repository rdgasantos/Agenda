import { catchError, retry } from 'rxjs/operators';
import { Usuario } from './../_models/Usuario';
import { Observable, throwError } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  
  baseURL = 'http://localhost:5000/api/user';
  
  constructor(private http: HttpClient, private toastr: ToastrService) { }

  getAllUsers(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.baseURL)
    .pipe(retry(2), catchError(this.handleError));
  }
  
  getUserById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.baseURL}/${id}`)
    .pipe(retry(2), catchError(this.handleError));
  }
  
  updateUser(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(`${this.baseURL}/${usuario.id}`, usuario )
    .pipe(retry(1), catchError(this.handleError));
  }

  deleteUser(id: number): Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.baseURL}/${id}`)
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
