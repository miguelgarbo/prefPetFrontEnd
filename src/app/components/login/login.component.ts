import {
  Component,
  inject,
  Input,
  model,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { Router, Routes } from '@angular/router';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { TutorService } from '../../services/tutor.service';
import { Tutor } from '../../models/tutor';

import { RouterModule } from '@angular/router';

import Swal from 'sweetalert2'
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

 
  @Output() retorno = new EventEmitter<any>;

  tutorService = inject(TutorService);
  public current_user: Tutor = new Tutor();

  modalService = inject(MdbModalService);
  @ViewChild('modalLogin') modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  email!: string;
  senha!: string;

  router = inject(Router);

  login(){
    this.tutorService.login(this.email, this.senha).subscribe({
        next: (bool) =>{
          if(bool == true){
            console.log(bool)
            this.tutorService.findByEmail(this.email).subscribe({

              next:(userLogado)=> {

                
              
                console.log("Opa Achei: ",userLogado)
                this.current_user = userLogado;
                this.retorno.emit(this.current_user)

                 Swal.fire({
                               title: `Seja Bem Vindo(a), ${this.current_user.nome} `,
                               icon: "success",
                               timer: 1500
                             });
              },error:(err)=>{
                console.error(err)
              }
            })

        this.router.navigate(['principal/animal']);
          }else{

             Swal.fire({
                icon: "error",
                title: "Erro ao Efeturar Login",
                text: "Email ou Senha Incorretos",
              });
            
          }
        },
        error: (err)=>{

          console.error(err)
        }
    })

    if(this.email === 'adm' && this.senha === '123'){

              // this.router.navigate(['principal/animal']);
              console.log("Passou")
    }


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
