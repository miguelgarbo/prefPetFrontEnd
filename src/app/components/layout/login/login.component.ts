

import { Component, EventEmitter, Output, inject, TemplateRef, ViewChild } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router, Routes } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutorService } from '../../../services/tutor.service';
import { Tutor } from '../../../models/tutor';

import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2'
import { LoginService } from '../../../services/login.service';
import { Login } from '../../../models/login';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginService = inject(LoginService);
  public current_user: Tutor = new Tutor();
  loginData = new Login();
  @Output() loginSucesso = new EventEmitter<void>();

  modalService = inject(MdbModalService);
  @ViewChild('modalLogin') modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  email!: string;
  senha!: string;

  router = inject(Router);

  login(){
    this.loginService.logar(this.loginData).subscribe({
        next: (token) =>{
          if(token){
            console.log(token)
              this.loginService.addToken(token)
              Swal.fire({
                          title: `Seja Bem Vindo(a) `,
                          icon: "success",
                          timer: 1500
                             });
                            }

                this.router.navigate(['/principal']);

              },error:(err)=>{

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
