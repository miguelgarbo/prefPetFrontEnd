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


@Component({
  selector: 'app-login',
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
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
}
