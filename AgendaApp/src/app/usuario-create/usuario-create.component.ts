import { AuthService } from './../_services/auth.service';
import { Usuario } from './../_models/Usuario';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-usuario-create',
  templateUrl: './usuario-create.component.html',
  styleUrls: ['./usuario-create.component.scss']
})
export class UsuarioCreateComponent implements OnInit {

  registerForm!: FormGroup;
  usuario!: Usuario;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService, private authService: AuthService) { }

  ngOnInit() {
    this.validation();
  }

  validation(){
    this.registerForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNasc: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  /* comparePasswords(fb: FormGroup){
    const confirmPassword = fb.get('confirmPassword');
    if ((confirmPassword?.errors == null) || ('mismatch' in confirmPassword?.errors)){
      if (fb.get('password')?.value !== confirmPassword?.value){
        confirmPassword?.setErrors({ mismatch: true});
      } else {
        confirmPassword?.setErrors(null);
      }
    }
  } */

  cadastrarUsuario(){
    if (this.registerForm.valid) {
      this.usuario = Object.assign(this.registerForm.value);
      this.authService.cadastrar(this.usuario).subscribe(() =>{
        this.router.navigate(['login']);
        this.toastr.success('Cadastro realizado com sucesso!');
      }, error => {
        const erro = error.error;
        erro.forEach( (element: any ) => {
          switch (element.code) {
            case 'DuplicateUserName':
              this.toastr.error('Cadastro Duplicado!');
              break;
            default:
              this.toastr.error(`Erro no cadastro! CÓDIGO: ${element.code}`);
              break;
          }
        });
      });

    }
  }


}
