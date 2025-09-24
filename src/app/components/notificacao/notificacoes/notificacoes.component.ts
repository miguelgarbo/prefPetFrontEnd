import { Component, inject } from '@angular/core';
import { CardNotificacaoComponent } from "../card-notificacao/card-notificacao.component";
import { Notificacao } from '../../../models/notificacao';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../../services/notificacao.service';
import { Tutor } from '../../../models/tutor';
import { TutorService } from '../../../services/tutor.service';

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
  currentUser: Tutor = new Tutor();

  ngOnInit(){
  this.getCurrentUser();
}

getCurrentUser() {
  this.tutorService.getCurrentUser().subscribe({
    next: (user) => {
      console.log("Usuário logado:", user);
      this.currentUser = user;

      this.buscarNotificacoesUsuario(this.currentUser.id);
    },
    error: (err) => {
      console.error("Nenhum usuário logado", err);
    }
  });
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
