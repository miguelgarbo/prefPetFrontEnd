import { Component, inject } from '@angular/core';
import { CardNotificacaoComponent } from "../card-notificacao/card-notificacao.component";
import { Notificacao } from '../../../models/notificacao';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../../services/notificacao.service';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-notificacoes',
  imports: [CardNotificacaoComponent],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.scss'
})
export class NotificacoesComponent {

  notificacoes: Notificacao[] = []
  router = inject(Router) 
  notificacaoService = inject(NotificacaoService)
  tutorService= inject(TutorService)

  loginService  = inject(LoginService)
  currentUser = this.loginService.getCurrentUser()

  ngOnInit(){

    this.buscarNotificacoesUsuario(this.currentUser.id)

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

}
