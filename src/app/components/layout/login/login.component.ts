

import { Component, EventEmitter, Output, inject, TemplateRef, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router, Routes } from '@angular/router';
import { MdbModalRef, MdbModalService, MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { TutorService } from '../../../services/tutor.service';
import { Tutor } from '../../../models/tutor';

import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2'
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../models/login';
import { Usuario } from '../../../models/usuario';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterModule, MdbModalModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  loginService = inject(LoginService);
  currentUser = new Usuario();
  loginData = new Login();
  @Output() loginSucesso = new EventEmitter<void>();

  modalService = inject(MdbModalService);
  @ViewChild('modalLogin') modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  router = inject(Router);

  login(){
    this.loginService.logar(this.loginData).subscribe({
        next: (token) =>{
          if(token){
            this.currentUser = this.loginService.getCurrentUser()

             console.log(token)
             this.loginService.addToken(token)

              console.log("usuario logado")
              
              console.log(this.currentUser.nome)
              Swal.fire({
                          title: `Seja Bem Vindo(a) ${this.currentUser.nome} !`,
                          icon: "success",
                          timer: 1500
                             });
                            }
                            this.loginSucesso.emit()

                this.router.navigate(['/principal']);

              },error:(err)=>{
              console.log(this.currentUser)

                 Swal.fire({
                               title: `Email Ou Senha Incorretos `,
                               icon: "warning",
                               timer: 1000
                             });
                console.error(err)
              }
            })
  }
  cadastrarRota(){
    this.router.navigate(['cadastro-usuario']);
  }

  // logar() {
  //   if (this.usuario == 'admin' && this.senha == '12345') {
  //     this.router.navigate(['principal']);
  //   } else {
  //     alert('USUÁRIO E/OU SENHA INCORRETOS!!!');
  //   }
  // }

  
}
