import { Component, inject } from '@angular/core';
import { CardNotificacaoComponent } from "../card-notificacao/card-notificacao.component";
import { Notificacao } from '../../../models/notificacao';
import { Router } from '@angular/router';
import { NotificacaoService } from '../../../services/notificacao.service';
import { TutorService } from '../../../services/tutor.service';
import { getUser } from '../../../services/keycloak.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-notificacoes',
  imports: [CardNotificacaoComponent],
  templateUrl: './notificacoes.component.html',
  styleUrl: './notificacoes.component.scss'
})
export class NotificacoesComponent {

  notificacoes: Notificacao[] = [];

  router = inject(Router);
  notificacaoService = inject(NotificacaoService);
  tutorService = inject(TutorService);
  usuarioService = inject(UsuarioService)

  currentUser: any;
  tutor: any;

  ngOnInit() {

    this.currentUser = getUser();

    const sub = this.currentUser.sub;

    this.getTutorByKeycloak(sub);
  }

  // 🔥 passo obrigatório: Keycloak → Tutor
  getTutorByKeycloak(sub: string) {

    this.usuarioService.findTutorByKeycloakId(sub).subscribe({
      next: (tutor) => {
        this.tutor = tutor;

        this.buscarNotificacoesUsuario(tutor.id);
      },
      error: (err) => {
        console.log("Erro ao buscar tutor:", err);
      }
    });

  }

  onConviteAceito() {
    this.buscarNotificacoesUsuario(this.tutor.id);
  }

  buscarNotificacoesUsuario(id: number) {
    this.notificacaoService.findByTutorId(id).subscribe({
      next: (notificacoes) => {
        this.notificacoes = notificacoes;
      },
      error: (err) => {
        console.log("Erro ao Buscar Notificacoes", err);
      }
    });
  }

}