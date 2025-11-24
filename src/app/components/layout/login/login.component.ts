

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
import { MessageErrorComponent } from '../message-error/message-error.component';



@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterModule, MdbModalModule, MessageErrorComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  deuErrado!: boolean;
  loginService = inject(LoginService);
  currentUser = new Usuario();
  loginData = new Login();
  @Output() loginSucesso = new EventEmitter<void>();

  modalService = inject(MdbModalService);
  @ViewChild('modalLogin') modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  router = inject(Router);

  constructor(){

    this.loginService.removeToken();
  }
  

  login(){

    this.loginService.logar(this.loginData).subscribe({
        next: (token) =>{
          if(token){

            this.loginService.addToken(token)
            this.currentUser = this.loginService.getCurrentUser()

            console.log("usuario logado")     
            console.log(this.currentUser.nome)
            console.log('token: ' + token)

            this.deuErrado = false
            this.loginSucesso.emit(); //devolve a requisição com sucesso e chama o  .close() para fechar o login automaticamente
            this.router.navigate(['principal/animal']);
         
            }else{

                this.deuErrado = true

            }
          
          
          },
              error:(err)=>{
              console.log(this.currentUser)
                console.error(err)

              }
            })
  }

  cadastrarRota(){
    this.router.navigate(['cadastro-usuario']);
  }

 
  
}
