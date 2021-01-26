import { error } from 'protractor';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../_models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  baseURL = 'http://localhost:5000/api';
  
  userId = 0;
  
  constructor(private http: HttpClient, private toastr: ToastrService, private route: Router) {}
  
  login(model: any) {
    
    /* const params_ = {
      email: model.email,
      password: model.password
    };
    
    let params = new HttpParams();
    params = params.set('email', model.email);
    params = params.set('password', model.password); */
    
    return this.http.get(`${this.baseURL}/auth/${model.email}/${model.password}`)
    .subscribe(
      (res: any) => {
        this.userId = res.id;
        console.log(res);
        localStorage.setItem('currentUser', 'loggedin');
        this.route.navigate([`eventos/${this.userId}`]);
      }, error => {
        this.toastr.error('Falha ao tentar Login');
        
      });
      
      /* const params: HttpParams = new HttpParams().set('email', model.email);
      
      return this.http.get(`${this.baseURL}/auth`, {params: params}).subscribe(
        (response: any) => {
          localStorage.setItem('currentUser', 'loggedin');
          this.route.navigate(['eventos']);
        }, error => {
          this.toastr.error("Falha ao tentar Login");
        }); */
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
