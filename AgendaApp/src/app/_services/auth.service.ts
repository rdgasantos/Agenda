import { error } from 'protractor';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private toastr: ToastrService, private route: Router) {}

  login(model: any) {

    return this.http.post(`${this.baseURL}/auth`, model).subscribe(
      (response: any) => {
        localStorage.setItem('currentUser', 'loggedin');
        this.route.navigate(['eventos']);
      }, error => {
        this.toastr.error("Falha ao tentar Login");
      });
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.toastr.show("Seção encerrada!");
    this.route.navigate(['login']);
  }

  cadastrar(model: any){
    return this.http.post(`${this.baseURL}/user`, model);
  }

  loggedIn(){
    return (localStorage.getItem('currentUser') !== null);
  }

}
