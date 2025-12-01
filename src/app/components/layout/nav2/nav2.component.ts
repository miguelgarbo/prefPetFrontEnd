import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TutorService } from '../../../services/tutor.service';
import { Notificacao } from '../../../models/notificacao';
import { NotificacaoService } from '../../../services/notificacao.service';
import { Usuario } from '../../../models/usuario';
import { LoginService } from '../../../services/login.service';
import { UsuarioService } from '../../../services/usuario.service';
import { VeterinarioService } from '../../../services/veterinario.service';
import { EntidadeService } from '../../../services/entidade.service';
import Swal from 'sweetalert2'



@Component({
  selector: 'app-nav2',
  imports: [FormsModule, RouterLink, RouterModule,],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  usuarioService = inject(UsuarioService)
  tutorService = inject(TutorService)
  loginService = inject(LoginService)
  veterinarioService = inject(VeterinarioService)
  entidadeService = inject(EntidadeService)
  router = inject(Router)
  notificacoes: Notificacao[] = []
  notificacaoService = inject(NotificacaoService)
  currentUser!: Usuario
  

  ngOnInit(){

    this.currentUser = this.loginService.getCurrentUser();

    this.findById()

    console.log("usuario logado no nav bar: ", this.currentUser);

  }

  editarPerfil() {
  if(this.currentUser.id){
    this.router.navigate(['/principal/cadastro-usuario', this.currentUser.id]);


  }
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
    this.usuarioService.findById(this.currentUser.id).subscribe({
        
      next:(value) => {
        console.log("Pessoa Encontrada NO NAV BAR",value);
        console.log("IMAGEM PROFILE:", this.currentUser.imagemUrlPerfil);

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

  historico_aplicacao(){

    this.router.navigate(['/historico-aplicacoes'])

  }

  cadastro_aplicacao(){

    this.router.navigate(['/cadastro-aplicacao-vacina'])
  }

  cadastro_post(){

    this.router.navigate(['/cadastro-publicacao'])
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
  
        // limpa tudão :)
        this.loginService.logout();
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
