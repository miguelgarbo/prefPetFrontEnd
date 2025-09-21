import {
  Component,
  inject,
  model,
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  modalService = inject(MdbModalService);
  tutorService = inject(TutorService);
  public current_user: Tutor = new Tutor();

  @ViewChild('modalLogin') modalLogin!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  usuario!: string;
  senha!: string;

  router = inject(Router);
  // modalRef = inject(MdbModalRef<CadastroUsuarioComponent>); fechar modal

  login(){
    this.tutorService.login(this.usuario, this.senha).subscribe({
        next: (bool) =>{
          if(bool == true){
            this.tutorService.findByEmail(this.usuario).subscribe({

              next:(userLogado)=> {
              
                console.log("Opa Achei: ",userLogado)
                this.current_user = userLogado;
              },error:(err)=>{
                console.error(err)

              }


            })

        this.router.navigate(['principal']);
          }else{
              alert('USUÁRIO E/OU SENHA INCORRETOS!!!');
          }
        },
        error: (err)=>{

          console.error(err)
        }
    })


  }

  logar() {
    if (this.usuario == 'admin' && this.senha == '12345') {
      this.router.navigate(['principal']);
    } else {
      alert('USUÁRIO E/OU SENHA INCORRETOS!!!');
    }
  }

  cadastrarRota(){
    this.router.navigate(['cadastro-usuario']);
  }
}
