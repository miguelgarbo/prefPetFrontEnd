import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink, RouterModule } from '@angular/router';

import { TutorService } from '../../../services/tutor.service';
import { VeterinarioService } from '../../../services/veterinario.service';
import { EntidadeService } from '../../../services/entidade.service';

import { Notificacao } from '../../../models/notificacao';
import { NotificacaoService } from '../../../services/notificacao.service';

import Swal from 'sweetalert2';
import { getUser, hasRole, logout } from '../../../services/keycloak.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-nav2',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  tutorService = inject(TutorService);
  veterinarioService = inject(VeterinarioService);
  entidadeService = inject(EntidadeService);
  usuarioService = inject(UsuarioService);

  notificacaoService = inject(NotificacaoService);
  router = inject(Router);

  notificacoes: Notificacao[] = [];
  currentUser!: any;

  isEntidade = false;
  isVeterinario = false;
  isTutor = false;
  isAdmin = false;

  ngOnInit() {

    this.isEntidade = hasRole("ENTIDADE");
    this.isVeterinario = hasRole("VETERINARIO");
    this.isTutor = hasRole("TUTOR");
    this.isAdmin = hasRole("ADMIN");

    this.currentUser = getUser();

    const sub = this.currentUser.sub;

    console.log("CURRENT USER:", this.currentUser);

    this.findById(sub);
  }

  // 🔥 agora usa service correta por role
  findById(sub: string) {

    if (this.isTutor) {

      this.usuarioService.findTutorByKeycloakId(sub).subscribe({
        next: (value) => {
          this.currentUser = value;
        },
        error: (err) => console.log("Erro Tutor:", err)
      });

    } else if (this.isVeterinario) {

      this.usuarioService.findVeterinarioByKeycloakId(sub).subscribe({
        next: (value) => {
          this.currentUser = value;
        },
        error: (err) => console.log("Erro Vet:", err)
      });

    } else if (this.isEntidade) {

      this.usuarioService.findEntidadeByKeycloakId(sub).subscribe({
        next: (value) => {
          this.currentUser = value;
        },
        error: (err) => console.log("Erro Entidade:", err)
      });

    }
  }

  editarPerfil() {
    if (this.currentUser?.id) {
      this.router.navigate(['/principal/cadastro-usuario', this.currentUser.id]);
    }
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

  notificacoesTela() {
    this.router.navigate(['principal/notificacoes']);
  }

  historico_aplicacao() {
    this.router.navigate(['/historico-aplicacoes']);
  }

  cadastro_aplicacao() {
    this.router.navigate(['/cadastro-aplicacao-vacina']);
  }

  cadastro_post() {
    this.router.navigate(['/cadastro-publicacao']);
  }

  logout() {
    Swal.fire({
      title: 'Deseja realmente sair?',
      text: 'Você será desconectado da sua conta.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, sair',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6'
    }).then((result) => {
      if (result.isConfirmed) {

        logout();
        this.router.navigate(['inicial']);

        Swal.fire({
          title: 'Desconectado!',
          text: 'Você saiu da sua conta.',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false
        });

      }
    });
  }
}