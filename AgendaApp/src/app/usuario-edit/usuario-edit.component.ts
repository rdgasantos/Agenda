import { AuthService } from './../_services/auth.service';
import { Usuario } from './../_models/Usuario';
import { UsuarioService } from './../_services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-usuario-edit',
  templateUrl: './usuario-edit.component.html',
  styleUrls: ['./usuario-edit.component.scss']
})
export class UsuarioEditComponent implements OnInit {

  usuario!: Usuario;
  registerForm!: FormGroup;
  id = this.route.snapshot.params['id'];

  constructor(private router: Router
    , private route: ActivatedRoute
    , private usuarioService: UsuarioService
    , private formBuilder: FormBuilder
    , private toastr: ToastrService
    , private authService: AuthService) { }

  ngOnInit() {
    this.getUsuario();
    this.validation();
  }

  getUsuario(){

    this.usuarioService.getUserById(this.id)
    .subscribe(
      (data: Usuario) => {
        this.usuario = data;
        this.registerForm.patchValue(this.usuario);
        console.log(this.usuario);
      });
  }

  editarUsuario(){
    if (this.registerForm.valid){
      this.usuario = Object.assign({id: this.usuario.id}, this.registerForm.value);
      this.usuarioService.updateUser(this.usuario).subscribe(
        (usuario: Usuario) => {
          this.toastr.success("Dados atualizados com sucesso!");
          this.router.navigate([`eventos/${this.id}`]);
        }, error => {
          this.toastr.error("Erro ao tentar atualizar seus dados!");
          console.log(error);
        });
      }
  }

  excluirUsuario(){
    this.usuarioService.deleteUser(this.usuario.id).subscribe(
      () => {
        this.toastr.success('Usuário excluido!');
        this.authService.logout();
      }, error => {
        this.toastr.error('Erro ao tentar Excluir evento!', 'ATENÇÃO:',  {timeOut: 3000});
        console.log(error);
      }
    );
  }

  validation(){
    this.registerForm = this.formBuilder.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      dataNasc: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      senha: ['', [Validators.required, Validators.minLength(4)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

}
