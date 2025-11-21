import { Component, inject } from '@angular/core';
import { Tutor } from '../../../models/tutor';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import { Notificacao } from '../../../models/notificacao';
import { NotificacaoService } from '../../../services/notificacao.service';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';


@Component({
  selector: 'app-nav2',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  tutorService = inject(TutorService)
  router = inject(Router)
  notificacoes: Notificacao[] = []
  notificacaoService = inject(NotificacaoService)
  loginService = inject(LoginService)
  currentUser: Usuario = this.loginService.getCurrentUser();

  ngOnInit(){

    console.log("usuario: "+ this.currentUser);
    this.findById();

  }

  editarPerfil() {
  if(this.currentUser.id)
    this.router.navigate(['/principal/cadastro-usuario', this.currentUser.id]);
}
    
    buscarNotificacoesUsuario(id: number){
      this.notificacaoService.findByTutorId(id).subscribe({
        next: (notificacoes) =>{
          console.log(notificacoes)
          this.notificacoes= notificacoes;
        },
        error: (err) =>{
          console.log("Erro ao Buscar Notificacoes", err)
        }
      })
    }


  findById(){
    this.tutorService.findById(this.currentUser.id).subscribe({
        
      next:(value) => {
        console.log("Pessoa Encontrada",value);
        this.currentUser = value

      },error(err) {
        console.log("Erro Ao pegar animal", err)
      },
    })
  }

   notificacoesTela(){
        this.router.navigate(['principal/notificacoes']);
        console.log("TESTE")
  }



}
