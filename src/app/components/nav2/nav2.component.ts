import { Component, inject } from '@angular/core';
import { Tutor } from '../../models/tutor';
import { FormsModule } from "@angular/forms";
import { Router, RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { TutorService } from '../../services/tutor.service';
import { Notificacao } from '../../models/notificacao';
import { NotificacaoService } from '../../services/notificacao.service';


@Component({
  selector: 'app-nav2',
  imports: [FormsModule, RouterLink, RouterModule],
  templateUrl: './nav2.component.html',
  styleUrl: './nav2.component.scss'
})
export class Nav2Component {

  tutor: Tutor = new Tutor();
  tutorService = inject(TutorService)
  router = inject(Router)
  notificacoes: Notificacao[] = []
  notificacaoService = inject(NotificacaoService)

  ngOnInit(){
    this.findById(1)
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


  findById(id:number){
    this.tutorService.findById(id).subscribe({
        
      next:(value) => {
        console.log("Pessoa Encontrada",value);
        this.tutor = value

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
