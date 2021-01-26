import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  model: any = {};

  constructor(private authoService: AuthService, public router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    if (this.authoService.loggedIn()){
      this.router.navigate(['eventos']);
    }
  }

  login(){
    this.authoService.login(this.model);
  }
  
}
