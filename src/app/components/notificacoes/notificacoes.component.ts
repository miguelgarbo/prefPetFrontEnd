import { Component, inject } from '@angular/core';
import { CardNotificacaoComponent } from "../card-notificacao/card-notificacao.component";
import { Notificacao } from '../../models/notificacao';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../services/notificacao.service';

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


  ngOnInit(){

    this.buscarNotificacoesUsuario()
  }

  buscarNotificacoesUsuario(){
    this.notificacaoService.findByTutorId(2).subscribe({
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
